import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import {connectDB} from './lib/db.js'
import fileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import cron from 'node-cron';

import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statsRoutes from './routes/stat.route.js';
import { createServer } from 'http';
import { initializeSocket } from './lib/socket.js';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;


const httpServer = createServer(app);
initializeSocket(httpServer)

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
}
)) 

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
  useTempFiles: true ,
  tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true,
  limits:{
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
 }));

// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use ("/api/stats", statsRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend" , "dist", "index.html"));
  })}

app.use((err,req,res,next) =>{ 
  console.error(err.stack);
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message });
})

httpServer.listen(PORT, () => { 
  console.log('Server is running on port 5000');
  connectDB()
}
);

//