export const commons = {
  /**
   * GET
   */
  downloadPackageImages: 'download_package_images',
  /**
   * GET
   */
  downloadPackageImagesActa: 'download_package_images_acta',
};

export const loginEndpoint = {
  /**
   * POST
   */
  loginAuthenticate: 'api/user/login',
  /**
   * GET
   */
  loginDominios: 'login/dominios',
};

export const PathUser = {
  /**
   * GET
   */
  getListUser: 'api/user/list',
  /**

  /**
   * POST
   */
  saveUser: 'api/user/insert',
  /**
   * PUT
   */
  updateUser:'api/user/update',

  getUserById:'api/user/get/'

};

export const PathLender = {
  /**
   * GET
   */
  getListLender: 'api/lender/list',
  /**

  /**
   * POST
   */
  saveLender: 'api/lender/insert',

  getLenderById:'api/lender/get/',
  updateLender:'api/lender/update',

};
export const PathCategory = {
  /**
   * GET
   */
  getListCategory:'api/Categoria/list',
  /**

  /**
   * POST
   */
  saveCategory:     'api/Categoria/insert',

  updCategory:   'api/Categoria/edit',

  getCategoryId:    'api/Categoria/get/',

  deleteCategoryId: 'api/Categoria/delete/',

};

export const PathTool = {
  /**
   * GET
   */
  getListTool: 'api/tool/list',

  getToolId: 'api/tool/get/',

  /**
   * POST
   */
  saveTool: 'api/tool/insert',
  updateTool:'api/tool/edit',
  deleteToolById:'api/tool/delete/',

  initPay:'api/Venta/iniciar-transaccion',
  commitPay:'api/Venta/confirmar-transaccion',

};
