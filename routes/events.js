/* 
    Event Routes
    /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

//Todos tienen que pasar por la validacion del JWT
router.use( validarJWT );


// Obtener eventos
router.get('/', getEventos );

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
     crearEvento 
);

//Actualizar Evento
router.put('/:id', actualizarEvento );

//Borrar Evento
router.delete('/:id', eliminarEvento );

module.exports = router;