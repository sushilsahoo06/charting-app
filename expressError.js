class expressError extends Error {
  constructor(status,meassage) {
    super()
    this.status=status;
    this.meassage=meassage;
  }
}
module.exports=expressError;