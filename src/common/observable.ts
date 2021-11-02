import { Readable } from 'stream';
import { Observable } from 'rxjs';

export const fromStream = <T>(
  stream: Readable,
  finishEventName = 'end',
  dataEventName = 'data'
): Observable<T> => {
  stream.pause();

  return new Observable<T>(observer => {
    function dataHandler(data: T) {
      observer.next(data);
    }

    function errorHandler(error: Error) {
      observer.error(error);
    }

    function endHandler() {
      observer.complete();
    }

    stream.addListener(dataEventName, dataHandler);
    stream.addListener('error', errorHandler);
    stream.addListener(finishEventName, endHandler);
    stream.resume();

    return () => {
      stream.removeListener(dataEventName, dataHandler);
      stream.removeListener('error', errorHandler);
      stream.removeListener(finishEventName, endHandler);
    };
  });
};
