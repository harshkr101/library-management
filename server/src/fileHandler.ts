import fs from 'fs/promises';
import {parse} from 'csv-parse';

export class FileHandler {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async read(): Promise<any[] | null> {
    try{
      const data = await fs.readFile(this.path, 'utf8');
      const rows = await new Promise<string[]>((resolve, reject) => {
        parse(data, { delimiter:';',columns: true }, (err, output) => {
          if (err) {
            reject(err);
          } else {
            resolve(output);
          }
        });
      });
      return rows;
    }catch(err){
      console.error(err);
      return null;
    }
  }

  async write(data:unknown[]): Promise<void> {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    try {
      await fs.writeFile(this.path, headers + rows, 'utf8');
    } catch (error) {
      console.error('Unable to write to file')
    }
  }
}
