export interface Song{
    _id: string;
    title: string;
    artist: string;
    album: string | null;
    imageUrl: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    audioUrl: string;
}

export interface Album{
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs:Song[];
} 

export interface Stats {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}

export interface Message {
	_id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}