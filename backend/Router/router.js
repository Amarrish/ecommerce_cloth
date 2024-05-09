import express from 'express'
const router = new express.Router()
import { useregister, userlogin } from '../Controller.js/usercontroller.js';


router.post('/user/register', useregister.register);
router.post('/user/login', userlogin.login);

export default router