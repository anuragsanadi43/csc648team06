/**
 * API Route Definitions
 *
 * This file registers all API endpoints and maps them
 * to their corresponding controller functions.
 */
import express from "express";
import * as middleware from "./middleware.js";
import * as health from "./controllers/health.controller.js"
import * as auth from "./controllers/auth.controller.js"
import * as message from "./controllers/message.controller.js"
import * as search from "./controllers/search.controller.js"
import * as subject from "./controllers/subjects.controller.js"
import * as tutor from "./controllers/tutor.controller.js"
import * as user from "./controllers/users.controller.js"

import { upload } from "./controllers/tutor.controller.js";

const routes = express.Router();

routes.get("/health", health.health);
routes.get("/users", user.getUsers);
routes.get("/subjects", subject.getSubjects);
routes.get("/search/tutors", search.searchTutors);
routes.get("/search/tutorBySubject", search.searchBySubject);
routes.post("/register", auth.register);
routes.post("/login", auth.login);

// Every route belows this requires login
routes.use(middleware.authenticate);

routes.post(
  "/apply",
  upload,
  tutor.applyForTutor
);

routes.post("/sendMessage", message.sendMessage);
routes.get("/getMessages/:senderID/:receiverID", message.getConversation);
routes.get("/receivedMessages/:receiverID", message.getReceivedMessages);
routes.get("/getMessages", message.getInbox);

routes.put(
  "/updateProfile",
  middleware.uploadPortrait.single("portrait"),
  user.updateProfile
);

routes.get("/profile", user.getProfile);

export default routes;