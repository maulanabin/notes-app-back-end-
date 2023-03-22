import handler from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.addNoteHandler,
    // options: {
    //   cors: {
    //     origin: ['*'],
    //   },
    // },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.editNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteHandler,
  },
];

export default routes;
