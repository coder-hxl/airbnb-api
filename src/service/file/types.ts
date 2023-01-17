export default interface IFileService {
  createAvatar(
    userId: number,
    url: string,
    filename: string,
    mimetype: string,
    size: number
  ): Promise<boolean>
}
