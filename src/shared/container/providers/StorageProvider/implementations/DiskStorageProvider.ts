import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePth = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePth);
    } catch {
      return;
    }

    await fs.promises.unlink(filePth);
  }
}

export default DiskStorageProvider;
