export interface ValueAndTime {
  modifiedDate: any;
  value: string;
}

export interface ImageCoordinatesAndText {
  coordinates: string;
  text: string;
}

export interface ScannedImageResponse {
  image_data: string;
  extracted_text: ImageCoordinatesAndText[];
}
