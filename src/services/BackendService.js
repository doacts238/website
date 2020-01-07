import httpService from './HttpService';

const PREFIX = 'http://new.doacts238.org';
//const PREFIX = './backend/';
// const DOWNLOAD_URI = 'downloadSignedFile.php';
// const UPLOAD_URI = 'uploadFile.php';
const SERMONS_URI = '/php/sermons.php';
const SERMON_URI = '/php/sermon.php';

class BackendService {
  static getUrl(url: string): string {
    return PREFIX + url;
  }

  static async getAllSermons() {
    const { data } = await httpService.get(
      `${PREFIX}${SERMONS_URI}?SHOW_ALL=1`
    );
    return data;
  }

  static async getSermons(nMaxEntries: Number) {
    const { data } = await httpService.get(
      `${PREFIX}${SERMONS_URI}?MAX_ENTRIES=${nMaxEntries}`
    );
    return data;
  }

  static async getSermon(nAudioId) {
    const { data } = await httpService.post(
      PREFIX + SERMON_URI,
      `AUDIO_ID=${nAudioId}`
    );
    return data;
  }

  // static uploadFileToSign(
  //   file: File,
  //   params?: Object = {},
  //   onProgress?: any => void = () => {}
  // ): Promise<any> {
  //   const data = new FormData();

  //   // put params in FormData
  //   if (params) {
  //     Object.entries(params).forEach(([name, value]) => {
  //       //$FlowFixMe
  //       data.append(name, value);
  //     });
  //   }

  //   // put file in FormData
  //   data.append('file', file);

  //   return axios.post(BackendService.getUrl(UPLOAD_URI), data, {
  //     onUploadProgress: onProgress,
  //     withCredentials: true,
  //     responseType: 'json'
  //   });
  // }

  // static downloadSignedFile(onProgress?: any => void = () => {}): Promise<any> {
  //   return axios.get(BackendService.getUrl(DOWNLOAD_URI), {
  //     onDownloadProgress: onProgress,
  //     withCredentials: true,
  //     responseType: 'blob'
  //   });
  // }
}

export default BackendService;
