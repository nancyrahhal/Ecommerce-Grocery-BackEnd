


import express from 'express';

import { categorycreate, categoryget, categoryupdate, categorydelete, categorygetone } from '../Controller/categoriescontroller.js';


const router=express.Router();


router.post('/',categorycreate)
router.get('/',categoryget)
router.get('/:id',categorygetone)
router.patch('/:id',categoryupdate)
router.delete('/:id',categorydelete)




export default router