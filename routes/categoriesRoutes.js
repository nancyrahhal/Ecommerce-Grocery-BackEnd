


import express from 'express';

import { categoryCreate, categoryGet, categoryUpdate, categoryDelete, categoryGetOne } from '../Controller/categoriescontroller.js';


const router=express.Router();


router.post('/',categoryCreate)
router.get('/',categoryGet)
router.get('/:id',categoryGetOne)
router.patch('/:id',categoryUpdate)
router.delete('/:id',categoryDelete)




export default router