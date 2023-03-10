import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
    Camera,
    CameraResultType,
    CameraSource,
    ImageOptions,
    Photo
} from '@capacitor/camera';
import { from, Observable, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from '../../models/post';
import { NewPost } from "src/app/models/new-post";
import { Image } from "src/app/models/image";
import { PostComments } from "src/app/models/post-comments";
import { commentResponse } from "src/app/models/comment-response";
import { newComment } from "src/app/models/new-comment";

@Injectable({ providedIn: "root" })

export class PostService {

    imgHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.qimgToken}`
    });

    constructor(private http: HttpClient) { }

    getPosts$(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }
    getPost$(id:string): Observable<PostComments> {
        return this.http.get<PostComments>(`${environment.apiUrl}/posts/`+ id);
    }

    postPost$(Post: NewPost): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/posts`, Post);
    }
    patchPost$(id:string, Post: Post): Observable<Object> {
        return this.http.patch(`${environment.apiUrl}/posts/`+ id, Post);
    }

    deletePost$(id: string): Observable<Post> {
        return this.http.delete<Post>(`${environment.apiUrl}/posts/${id}`)
    }

    getComments$(postId: string): Observable<commentResponse> {
        return this.http.get<commentResponse>(`${environment.apiUrl}/posts/${postId}/comments`)
    }

    postComment$(Comment: newComment): Observable<Comment> {
        return this.http.post<Comment>(`${environment.apiUrl}/posts/${Comment.postId}/comments`, Comment)
    }


    requestOptions = { headers: this.imgHeader };

    takeAndUploadPicture(): Observable<Image> {
        // Take a picture.
        // This creates an observable of picture data.
        return this.takePicture().pipe(
            // Once the picture has been taken, upload it to the qimg API.
            // This returns a new observable of the resulting Image object.
            switchMap((data) => this.uploadImage(data.base64String)),
            // Once the picture has been uploaded, log a message to the console
            // indicating that all went well.
            // This does not change the observable stream and you can delete this
            // if you don't want to log the URL to the image
            tap((image) =>
                console.log(`Successfully uploaded picture to ${image.url}`)
            )
        );
    }

    /**
     * Launches the camera to take a picture.
     *
     * Returns an observable that will emit the raw picture data as a string
     * once the picture has been taken. An error may be emitted instead if the
     * user does not take a picture.
     */
    private takePicture(): Observable<Photo> {
        // Prepare camera options.
        const options: ImageOptions = {
            quality: 50,
            resultType: CameraResultType.Base64,
            // You could also user Photos (to select from the gallery)
            // or Prompt to let the user decide. Your choice.
            source: CameraSource.Prompt,
        };

        // Start taking a picture.
        // The promise will be resolved when the user has snapped and validated the picture.
        // It may be rejected if the user does not take a picture.
        const pictureDataPromise = Camera.getPhoto(options);

        // Convert the promise to an observable and return it.
        return from(pictureDataPromise);
    }

    uploadImage(base64: string | ArrayBuffer): Observable<Image> {
        const requestBody = {
            data: base64,
        };

        return this.http.post<Image>(
            `${environment.qimgUrl}`,
            requestBody,
            this.requestOptions
        );

    }

    retrieveImage(): Observable<any> {
        return this.http.get<any>(`${environment.qimgUrl}/`, this.requestOptions);
    }

    deleteImage(imgId): Observable<any> {
        return this.http.post<any>(`${environment.qimgUrl}/${imgId}`, this.requestOptions);
    }

}