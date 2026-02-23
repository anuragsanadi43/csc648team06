/**
 * Middleware
 *
 * Holds code that connects the backend to frontend
 * includes token authentication and file upload
 * 
 */

import jwt from "jsonwebtoken";

import multer from "multer";
import path from "path";
import fs from "fs";

// token authentication
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[0];

  // No token provided
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    // Continue to the route
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Make sure the folder exists
const portraitPath = path.join(process.cwd(), "uploads/portraits");

if (!fs.existsSync(portraitPath)) {
  fs.mkdirSync(portraitPath, { recursive: true });
}

const portraitStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, portraitPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

export const uploadPortrait = multer({
  storage: portraitStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.test(ext));
  }
});

const uploadCVPath = path.join(process.cwd(), "uploads/cv");

if (!fs.existsSync(uploadCVPath)) {
  fs.mkdirSync(uploadCVPath, { recursive: true });
}

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadCVPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

export const uploadCV = multer({
  storage: cvStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only PDF/DOC/DOCX allowed"));
  }
});
