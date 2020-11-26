

export class Photo {

  public file_id: string;
  public file_unique_id: string;
  public file_size: number;
  public width: number;
  public height: number;
  public file_path: string;

  constructor(init?: Partial<Photo>) {

    if (init) {

      this.file_id = init.file_id;
      this.file_unique_id = init.file_unique_id;
      this.file_size = init.file_size;
      this.width = init.width;
      this.height = init.height;
    }

  }
}