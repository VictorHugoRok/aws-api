const express = require('express');
const app = express();

app.use(express.json());

let alumnos = [];
let profesores = [];



const validarCamposAlumno = ({ id, nombres, apellidos, matricula, promedio }) => {
    if (!id || !nombres || !apellidos || !matricula || promedio === undefined) {
        return "Campos incompletos";
    }
    if (typeof promedio !== "number") {
        return "Promedio debe ser número";
    }
    return null;
};

const validarCamposProfesor = ({ id, numeroEmpleado, nombres, apellidos, horasClase }) => {
    if (!id || !numeroEmpleado || !nombres || !apellidos || horasClase === undefined) {
        return "Campos incompletos";
    }
    if (typeof horasClase !== "number") {
        return "horasClase debe ser número";
    }
    return null;
};



// ENDPOINTS ALUMNOS


// GET /alumnos
app.get('/alumnos', (req, res) => {
    res.status(200).json(alumnos);
});

// GET /alumnos/:id
app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id == req.params.id);
    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

    res.json(alumno);
});

// POST /alumnos
app.post('/alumnos', (req, res) => {
    const error = validarCamposAlumno(req.body);
    if (error) return res.status(400).json({ error });

    const existe = alumnos.find(a => a.id == req.body.id);
    if (existe) {
        return res.status(400).json({ error: "ID ya existe" });
    }

    alumnos.push(req.body);
    res.status(201).json(req.body);
});

// PUT /alumnos/:id
app.put('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id == req.params.id);
    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

    // Evitar modificar el ID
    const { id, ...resto } = req.body;

    const error = validarCamposAlumno({ ...alumno, ...resto });
    if (error) return res.status(400).json({ error });

    Object.assign(alumno, resto);
    res.json(alumno);
});

// DELETE /alumnos/:id
app.delete('/alumnos/:id', (req, res) => {
    const existe = alumnos.find(a => a.id == req.params.id);
    if (!existe) return res.status(404).json({ error: "Alumno no encontrado" });

    alumnos = alumnos.filter(a => a.id != req.params.id);
    res.json({ mensaje: "Alumno eliminado" });
});


// =======================
// ENDPOINTS PROFESORES
// =======================

// GET /profesores
app.get('/profesores', (req, res) => {
    res.status(200).json(profesores);
});

// GET /profesores/:id
app.get('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id == req.params.id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    res.json(profesor);
});

// POST /profesores
app.post('/profesores', (req, res) => {
    const error = validarCamposProfesor(req.body);
    if (error) return res.status(400).json({ error });

    const existe = profesores.find(p => p.id == req.body.id);
    if (existe) {
        return res.status(400).json({ error: "ID ya existe" });
    }

    profesores.push(req.body);
    res.status(201).json(req.body);
});

// PUT /profesores/:id
app.put('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id == req.params.id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    const { id, ...resto } = req.body;

    const error = validarCamposProfesor({ ...profesor, ...resto });
    if (error) return res.status(400).json({ error });

    Object.assign(profesor, resto);
    res.json(profesor);
});

// DELETE /profesores/:id
app.delete('/profesores/:id', (req, res) => {
    const existe = profesores.find(p => p.id == req.params.id);
    if (!existe) return res.status(404).json({ error: "Profesor no encontrado" });

    profesores = profesores.filter(p => p.id != req.params.id);
    res.json({ mensaje: "Profesor eliminado" });
});


app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor corriendo en puerto 3000");
});