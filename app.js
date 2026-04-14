const express = require('express');
const app = express();

app.use(express.json());

let alumnos = [];
let profesores = [];

// =======================
// VALIDACIONES
// =======================

const validarCamposAlumno = ({ id, nombres, apellidos, matricula, promedio }) => {
    if (id === undefined || !nombres || !apellidos || !matricula || promedio === undefined) {
        return "Campos incompletos";
    }
    if (typeof promedio !== "number") {
        return "Promedio debe ser número";
    }
    return null;
};

const validarCamposProfesor = ({ id, numeroEmpleado, nombres, apellidos, horasClase }) => {
    if (id === undefined || numeroEmpleado === undefined || !nombres || !apellidos || horasClase === undefined) {
        return "Campos incompletos";
    }
    if (typeof horasClase !== "number") {
        return "horasClase debe ser número";
    }
    return null;
};

// =======================
// ALUMNOS
// =======================

// GET /alumnos
app.get('/alumnos', (req, res) => {
    return res.status(200).json(alumnos);
});

// GET /alumnos/:id
app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id === Number(req.params.id));

    if (!alumno) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }

    return res.status(200).json(alumno);
});

// POST /alumnos
app.post('/alumnos', (req, res) => {
    const error = validarCamposAlumno(req.body);
    if (error) return res.status(400).json({ error });

    const existe = alumnos.find(a => a.id === req.body.id);
    if (existe) {
        return res.status(400).json({ error: "ID ya existe" });
    }

    alumnos.push(req.body);
    return res.status(201).json(req.body);
});

// PUT /alumnos/:id
app.put('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id === Number(req.params.id));

    if (!alumno) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }

    const { id, ...resto } = req.body;

    const error = validarCamposAlumno({ ...alumno, ...resto });
    if (error) return res.status(400).json({ error });

    Object.assign(alumno, resto);

    return res.status(200).json(alumno);
});

// DELETE /alumnos/:id
app.delete('/alumnos/:id', (req, res) => {
    const index = alumnos.findIndex(a => a.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }

    alumnos.splice(index, 1);

    return res.status(200).json({ mensaje: "Alumno eliminado" });
});

// =======================
// PROFESORES
// =======================

// GET /profesores
app.get('/profesores', (req, res) => {
    return res.status(200).json(profesores);
});

// GET /profesores/:id
app.get('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id === Number(req.params.id));

    if (!profesor) {
        return res.status(404).json({ error: "Profesor no encontrado" });
    }

    return res.status(200).json(profesor);
});

// POST /profesores
app.post('/profesores', (req, res) => {
    const error = validarCamposProfesor(req.body);
    if (error) return res.status(400).json({ error });

    const existe = profesores.find(p => p.id === req.body.id);
    if (existe) {
        return res.status(400).json({ error: "ID ya existe" });
    }

    profesores.push(req.body);
    return res.status(201).json(req.body);
});

// PUT /profesores/:id
app.put('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id === Number(req.params.id));

    if (!profesor) {
        return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const { id, ...resto } = req.body;

    const error = validarCamposProfesor({ ...profesor, ...resto });
    if (error) return res.status(400).json({ error });

    Object.assign(profesor, resto);

    return res.status(200).json(profesor);
});

// DELETE /profesores/:id
app.delete('/profesores/:id', (req, res) => {
    const index = profesores.findIndex(p => p.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: "Profesor no encontrado" });
    }

    profesores.splice(index, 1);

    return res.status(200).json({ mensaje: "Profesor eliminado" });
});

// =======================
// EXPORT (CLAVE PARA TESTS)
// =======================
module.exports = app;

// SOLO levantar servidor si no está en testing
if (require.main === module) {
    app.listen(3000, '0.0.0.0', () => {
        console.log("Servidor corriendo en puerto 3000");
    });
}