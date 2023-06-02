const { userController } = require("../controllers");
const { verifyToken, upload, verifyUser } = require("../middlewares");
module.exports = function (app) {
  app.get("/", (req, res) => {
    res.redirect(301, "/v1/docs");
  });
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  /**
   * @swagger
   * /v1/users/login:
   *   post:
   *     tags:
   *       - User Management
   *     summary: Logs user into application
   *     description: Logs user into application using registered email & password.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                email:
   *                  type: string
   *                  description: The user's email.
   *                  example: example@example.com
   *                password:
   *                  type: string
   *                  description: The user's password.
   *                  example: 123456
   *     responses:
   *       200:
   *          description: Successfully logged in.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Message Success Log in
   *                    example: Successfully logged in
   *                  accessToken:
   *                    type: string
   *                    description: User's access token to access API.
   *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1ODhmOTgyLWFmM2UtNGI5ZS04NWRjLTRlNjYyZTkzYThiZSIsImlhdCI6MTY3ODMwODMwMywiZXhwIjoxNjc4MzExOTAzfQ.S6o8jOirnqTy7N59049xBIdfujWFBHmA5fNgt_C1P64
   *       400:
   *         description: Invalid password. incorrect password.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Wrong password.
   *       404:
   *         description: User not found, incorrect username.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Email not Registered
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to login. Please check application log.
   */
  app.post("/v1/users/login", userController.login);

  /**
   * @swagger
   * /v1/users:
   *   post:
   *     tags:
   *       - User Management
   *     summary: Register New User
   *     description: Logs user into application using registered name, email and password.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                name:
   *                  type: string
   *                  description: The user's name.
   *                  example: johndoe
   *                email:
   *                  type: string
   *                  description: The user's email.
   *                  example: example@example.com
   *                password:
   *                  type: string
   *                  description: The user's password.
   *                  example: 123456
   *                confirmPassword:
   *                  type: string
   *                  description: confirm password.
   *                  example: 123456
   *     responses:
   *       200:
   *          description: Successfully logged in.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Message Success Log in
   *                    example: Success Create Account
   *                  data:
   *                    type: object
   *                    properties:
   *                      name:
   *                        type: string
   *                        description: The user's name.
   *                        example: johndoe
   *                      email:
   *                        type: string
   *                        description: The user's email.
   *                        example: example@example.com
   *       400:
   *         description: Password and Confirm Password Not Match or Duplicate Email
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Password and Confirm Password Not Match or Duplicate Email
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to register. Please check application log.
   */
  app.post("/v1/users", verifyUser.checkDuplicateEmail, userController.createUser);

  /**
   * @swagger
   * /v1/users/logout:
   *   delete:
   *     tags:
   *       - User Management
   *     summary: Logout application
   *     description: Logout user from application
   *     responses:
   *       200:
   *          description: Successfully Logout
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Message Success Log in
   *                    example: Successfully Logout
   *       204:
   *         description: No Content Refresh Token Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: No Content
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to register. Please check application log.
   */
  app.delete("/v1/users/logout", userController.logout);

  /**
   * @swagger
   * /v1/users/{id}:
   *   patch:
   *     tags:
   *       - User Management
   *     summary: Update User
   *     description: Update Data User
   *     parameters:
   *      - in: header
   *        name: Authorization
   *        description: Bearer token
   *        required: true
   *        schema:
   *          type: string
   *      - in: path
   *        name: User ID
   *        description: ID of the user
   *        required: true
   *        schema:
   *          type: string
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *                name:
   *                  type: string
   *                  description: The user's name.
   *                  example: johndoe
   *                email:
   *                  type: string
   *                  description: The user's email.
   *                  example: example@example.com
   *                role:
   *                  type: string
   *                  description: The user's role.
   *                  example: 123456
   *                about:
   *                  type: string
   *                  description: The user's about.
   *                  example: 123456
   *                sosialMedia:
   *                  type: string
   *                  description: The user's sosialMedia.
   *                  example: 123456
   *                picture:
   *                  type: string
   *                  description: The user's picture.
   *                  format: binary
   *     responses:
   *       200:
   *          description: Successfully Update User.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Message Success Update User
   *                    example: Success Update User
   *       400:
   *         description: Error image file
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Error image file
   *       404:
   *         description: User Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: User not found
   *       401:
   *         description: No Refresh Token in Cookie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: No refresh token found in cookie
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Forbidden
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to update. Please check application log.
   */
  app.patch("/v1/users/:id", verifyToken, upload.single("picture"), verifyUser.checkDuplicateEmail, userController.updateUser);

  /**
   * @swagger
   * /v1/users:
   *   get:
   *     tags:
   *       - User Management
   *     summary: Get All Users
   *     description: Get All Users
   *     parameters:
   *      - in: header
   *        name: Authorization
   *        description: Bearer token
   *        required: true
   *        schema:
   *          type: string
   *      - in: query
   *        name: name
   *        description: Search by name
   *        required: false
   *        schema:
   *          type: string
   *     responses:
   *       200:
   *          description: Success Get All Users.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Success Get All Users
   *                    example: Success Get All Users
   *                  data:
   *                    type: array
   *                    items:
   *                      type: object
   *                      properties:
   *                        id:
   *                          type: string
   *                          description: User Id
   *                          example: 487d0de1-9578-452b-adda-e9744ba1940a
   *                        email:
   *                          type: string
   *                          description: User Id
   *                          example: example@gmail.com
   *                        name:
   *                          type: string
   *                          description: Name User
   *                          example: johndoe
   *       400:
   *         description: Error image file
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Error image file
   *       404:
   *         description: User Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: User not found
   *       401:
   *         description: No Refresh Token in Cookie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: No refresh token found in cookie
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Forbidden
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to update. Please check application log.
   */
  app.get("/v1/users", verifyToken, userController.getUser);

  /**
   * @swagger
   * /v1/users/token:
   *   get:
   *     tags:
   *       - User Management
   *     summary: Get Access Token
   *     description: Get Access Token by send refresh token
   *     responses:
   *       200:
   *          description: Success Get Access Token
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  accessToken:
   *                    type: string
   *                    description: Success Get Access Token
   *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5MjRiOTBjLTQ4MDUtNGY0Mi1hNGMxLWRhNWRkMjQzZWZmMiIsImlhdCI6MTY3ODMwOTE4NSwiZXhwIjoxNjc4MzEyNzg1fQ.QtXPJ4Xknj6JGDCzIvj92cZKmsu3206kJvXyi-Y-p30
   *       401:
   *         description: No Refresh Token in Cookie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: No refresh token found in cookie
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Forbidden
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to update. Please check application log.
   */
  app.get("/v1/users/token", userController.refreshToken);

  /**
   * @swagger
   * /v1/users/{id}:
   *   get:
   *     tags:
   *       - User Management
   *     summary: Get Data User By Id
   *     description: Get Data User by Id
   *     parameters:
   *      - in: path
   *        name: id
   *        description: Get User by id
   *        required: true
   *        schema:
   *          type: string
   *     responses:
   *       200:
   *          description: Success Get User by id.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Success Fetch Data
   *                    example: Success Fetch Data
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        type: object
   *                      experience:
   *                        type: array
   *                        items:
   *                            type: object
   *                      skills:
   *                        type: array
   *                        items:
   *                            type: object
   *                      projects:
   *                        type: array
   *                        items:
   *                            type: object
   *                      certificate:
   *                        type: array
   *                        items:
   *                            type: object
   *       404:
   *         description: User Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: User not found
   *       401:
   *         description: No Refresh Token in Cookie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: No refresh token found in cookie
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Forbidden
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to update. Please check application log.
   */
  app.get("/v1/users/:id", verifyToken, userController.getDataById);

  /**
   * @swagger
   * /v1/users/{id}:
   *   delete:
   *     tags:
   *       - User Management
   *     summary: Delete User By Id
   *     description: Delete User by Id
   *     parameters:
   *      - in: path
   *        name: id
   *        description: Delete User by id
   *        required: true
   *        schema:
   *          type: string
   *     responses:
   *       200:
   *          description: Success Delete User by id.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Success Delete User
   *                    example: Success Delete User
   *       404:
   *         description: User Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: User not found
   *       401:
   *         description: No Refresh Token in Cookie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: No refresh token found in cookie
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Forbidden
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to update. Please check application log.
   */
  app.delete("/v1/users/:id", verifyToken, verifyUser.isAdmin, userController.deleteUser);

  /**
   * @swagger
   * /v1/users:
   *   delete:
   *     tags:
   *       - User Management
   *     summary: Delete All Users
   *     description: Delete All Users
   *     parameters:
   *      - in: path
   *        name: id
   *        description: Delete User by id
   *        required: true
   *        schema:
   *          type: string
   *     responses:
   *       200:
   *          description: Success Delete All User.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Success Delete All Users
   *                    example: Success Delete All Users
   *       404:
   *         description: User Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: User not found
   *       401:
   *         description: No Refresh Token in Cookie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: No refresh token found in cookie
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Forbidden
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to update. Please check application log.
   */
  app.delete("/v1/users", verifyToken, verifyUser.isAdmin, userController.deleteAllUsers);
};
