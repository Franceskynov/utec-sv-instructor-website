export const environment = {
  production: true,
  CONTROL_URL_API: window.location.protocol + '//' + window.location.host + '/api/v1/',
  APP_KEY: '',
  MESSAGES: {
    SERVICE_ERROR: 'Error al conectarse al servicio',
    SERVICE_WARN: '',
    WARN: 'Advertencia',
    SERVICE_OK: '',
    DELETION_OK: 'El registro se realizo exitosamente',
    UPDATED_OK: 'La actualizacion se realizo exitosamente',
    FILE_TRANSFORMED_OK: 'El archivo se convirtio correctamente',
    CREATED_OK: 'El registro se creo exitosamante',
    MODIFIED_OK: 'El registro se modifico exitosamante',
    UPLOAD_SUCCESS: 'El archivo ha sido cargado',
    SERVER_ERROR: 'Error al conectarse al servidor',
    MULTIPLE_FILES_ERROR: 'At the moment multiple files can not be processed',
    FILES_ERROR: 'Ningun archivo ha sido cargado para procesar',
    DOCUMENT_FORMAT_ERROR : 'La tabla no cumple con el formato de columnas establecido',
    INVALID_SCORE: 'La nota ingresada es invalida porfavor revise',
    ERROR: 'Error',
    OK: 'Ok'
  },
};