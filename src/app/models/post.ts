import { User } from "./user";

export type Post = {
    _id: string;
    picture: {
        url: string;
        ext: string;
    };
    location: {
        type: 'Point';
        coordinates: number[];
    };
    description: string;
    creationDate: Date;
    visitDate: Date;
    modificationDate: Date;
    visible: boolean;
    userId: User;
  };