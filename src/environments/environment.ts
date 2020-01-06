// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // CONTROL_URL_API: 'http://localhost:8000/api/v1/',
  CONTROL_URL_API: 'http://192.168.1.4:8000/api/v1/',
  APP_KEY: '6ZuNRwGbPhFTZvYg6cDl51PbSx0ck96WyXVhXBazxw8=',
  CLIENT_AUTHORIZATION: 'BuYsqt9wA8Uoi3DzaI512DLCA0OKA63crLK/hWnw7I4Sv9hARp4Jd9AACHAOqZJtyDiEPFs3AbQlWlTX4x4zVQ==',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
