export interface ValueAndTime {
  modifiedDate: any;
  value: string;
}

export interface ImageCoordinatesAndText {
  coordinates: number[][];
  text: string;
}

export interface ScannedImageResponse {
  image_data: string;
  extracted_text: ImageCoordinatesAndText[];
}
