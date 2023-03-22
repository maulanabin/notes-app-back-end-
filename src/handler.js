import { nanoid } from 'nanoid';
import notes from './notes.js';

const addNoteHandler = (request, h) => {
  let response = {
    status: 'fail',
    message: 'catatan gagal ditambahkan',
  };
  let statusCode = 500;

  const { title, tags, body } = request.payload;

  const id = nanoid(16);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    response = {
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    };
    statusCode = 201;
  }

  //   return h
  //     .header('Access-Control-Allow-Origin', '*')
  //     .response(response)
  //     .code(statusCode);
  return h.response(response).code(statusCode);
};

const getNoteHandler = (request, h) => {
  const data = {
    status: 'success',
    data: {
      notes,
    },
  };
  return h.response(data).code(200);
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id);
  if (note.length == 0) {
    let resp = {
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    };
    return h.response(resp).code(404);
  }
  let resp = {
    status: 'success',
    data: {
      note,
    },
  };
  return h.response(resp).code(200);
};

const editNoteHandler = (request, h) => {
  const { id } = request.params;
  const idxNote = notes.findIndex((note) => note.id === id);
  if (idxNote == -1) {
    let resp = {
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    };
    return h.response(resp).code(404);
  }

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  notes[idxNote] = {
    ...notes[idxNote],
    title,
    tags,
    body,
    updatedAt,
  };
  let resp = {
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  };
  return h.response(resp).code(200);
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;
  const idxNote = notes.findIndex((note) => note.id === id);
  if (idxNote == -1) {
    let resp = {
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    };
    return h.response(resp).code(404);
  }

  notes.splice(idxNote, 1);
  let resp = {
    status: 'success',
    message: 'Catatan berhasil dihapus',
  };
  return h.response(resp).code(200);
};

export default {
  addNoteHandler,
  getNoteHandler,
  getNoteByIdHandler,
  editNoteHandler,
  deleteNoteHandler,
};
