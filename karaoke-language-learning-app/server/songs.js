import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto", // Required by AWS SDK, not used by R2
  endpoint: "https://" + process.env.CLOUDFLARE_ACCOUNT_ID + ".r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

// Upload a file
await s3.send(
  new PutObjectCommand({
    Bucket: "songs",
    Key: "myfile.txt",
    Body: "Hello, R2!",
  }),
);
console.log("Uploaded myfile.txt");

// Download a file
const response = await s3.send(
  new GetObjectCommand({
    Bucket: "songs",
    Key: "myfile.txt",
  }),
);
const content = await response.Body.transformToString();
console.log("Downloaded:", content);

// List objects
const list = await s3.send(
  new ListObjectsV2Command({
    Bucket: "songs",
  }),
);
console.log(
  "Objects:",
  list.Contents.map((obj) => obj.Key),
);
