import { IncomingForm } from 'formidable';
import fs from 'fs';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing the form:', err);
      return res.status(500).send({ error: 'Error parsing the form data' });
    }
  
  
  
    // Adjusted from 'file' to 'image' based on the console log
    const fileArray = files.image;
  
    // Check if the fileArray exists and is an array with at least one file
    if (!fileArray || fileArray.length === 0) {
      console.error('File not found in the request');
      return res.status(400).send({ error: 'No file uploaded' });
    }
  
    // Assuming we're interested in the first file if multiple are uploaded
    const file = fileArray[0];
  
    if (!file.originalFilename) {
      console.error('Uploaded file has no original filename');
      return res.status(400).send({ error: 'File has no original filename' });
    }
  
    const filename = file.originalFilename;
  
    fs.promises.readFile(file.filepath)
      .then(fileContent => {
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) {
          throw new Error('BLOB_READ_WRITE_TOKEN not found');
        }
  
        return put(filename, fileContent, {
          access: 'public',
          token: token,
        });
      })
      .then(blob => {
        res.status(200).json(blob);
      })
      .catch(error => {
        console.error('Error handling the file:', error);
        res.status(500).send({ error: error.message });
      });
  });
}