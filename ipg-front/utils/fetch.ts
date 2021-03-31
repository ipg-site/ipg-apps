import {Presentation, PresentationDTO, UserDTO} from '../../ipg-api-server/src/types/user.types';
import {FileDTO} from '../../ipg-api-server/src/types/file.types';
import {AdminConfigDTO} from '../../ipg-api-server/src/types/admin.types';
import {HistoryDTO} from '../../ipg-api-server/src/types/history.types';

export type UserFileDTO = UserDTO & {file: FileDTO}

export type OKNG = 'OK' | 'NG'

const apiServer = process.env.API_SERVER;

export const login = async (username: string, password: string): Promise<OKNG | 'CHANGE'> => {
  const res = await fetch(apiServer + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username, password,
    }),
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  if (res.status === 'CHANGE_PASSWORD_REQUEST') {
    return 'CHANGE';
  }
  if (res.status === 'success') {
    return 'OK';
  }
  return 'NG';
}
;

export const loginWithNewPassword = async (username: string, password: string, newPassword: string): Promise<OKNG | 'CHANGE'> => {
  const res = await fetch(apiServer + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username, password, newPassword,
    }),
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  if (res.status === 'CHANGE_PASSWORD_REQUEST') {
    return 'CHANGE';
  }
  if (res.status === 'success') {
    return 'OK';
  }
  return 'NG';
}
  ;

export const isLoggedIn = async (): Promise<OKNG> => {
  const res = await fetch(apiServer + '/auth/check', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  if (res.status === 'OK') return 'OK';
  return 'NG';
}
;


export const isAdmin = async (): Promise<OKNG> => {
  const res = await fetch(apiServer + '/auth/check', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  if (res.status === 'OK' && res.isAdmin === true) return 'OK';
  return 'NG';
}
  ;

export const getUserList = async (): Promise<{status: OKNG, data: UserFileDTO[]}> => {
  const res = await fetch(apiServer + '/user', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  return {
    status: res.status === 'success' ? 'OK': 'NG',
    data: res.data,
  };
};

export const getUserListByType = async (type: Presentation): Promise<{status: OKNG, data: PresentationDTO[]}> => {
  const res = await fetch(apiServer + '/user/list/' + type, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  return {
    status: res.status === 'success' ? 'OK': 'NG',
    data: res.data,
  };
};


export const getUserData = async (): Promise<{status: OKNG, data: UserFileDTO}> => {
  const res = await fetch(apiServer + '/user/meta', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  return {
    status: res.status === 'success' ? 'OK': 'NG',
    data: res.data,
  };
}
;

export const adminGetUserData = async (id: number): Promise<{status: OKNG, data: UserFileDTO}> => {
  const res = await fetch(apiServer + '/user/' + id, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (x) => x.json());
  return {
    status: res.status === 'success' ? 'OK': 'NG',
    data: res.data,
  };
};

export const adminUpdateUserData = async (id: number, user: UserDTO): Promise<OKNG> => {
  const res = await fetch(apiServer + '/user/' + id, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  }).then(async (x) => x.json());
  return res.status === 'success' ? 'OK' : 'NG';
};

export const adminChangePassword = async (id: number): Promise<{status: OKNG, password: string}> => {
  const res = await fetch(apiServer + '/user/reset_password/' + id, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async (x) => x.json());
  return {
    status: res.status as OKNG,
    password: res?.data?.password || '',
  };
};

export const uploadFile = async (endpoint: string, file: File): Promise<{status: OKNG, message: string, statusCode?: number}> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(apiServer + endpoint, {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    body: formData,
  }).then(async (x) => x.json());
  if (res.status !== 'success') {
    return {
      status: 'NG',
      message: res.message,
      statusCode: res.statusCode || res.status,
    };
  }
  return {
    status: 'OK',
    message: 'アップロードされました。',
  };
}
;

export const addUser = async (userData: UserDTO): Promise<{status: OKNG, username: string, password: string}> => {
  const res = await fetch(apiServer + '/user', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(userData),
  }).then(async (x) => x.json());
  return {
    status: res.status === 'success' ? 'OK' : 'NG',
    username: res.data.username,
    password: res.data.password,
  };
}
;

export const getFile = async (type: 'abstract' | 'movie' | 'presentation', fid: number): Promise<{status: OKNG, data: string, link: string}> => {
  const res = await fetch(apiServer + '/file/' + type + '/' + fid, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (x) => {
    const blob = await x.blob();
    return {
      status: true,
      blob,
    };
  });
  const base64file = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(res.blob);
    reader.onloadend = function() {
      const strRes = String(reader.result);
      const offset = strRes.indexOf(',') + 1;
      resolve(strRes.slice(offset) as string);
    };
  });
  return {
    status: res?.status ? 'OK' : 'NG',
    data: base64file,
    link: apiServer + '/file/' + type + '/' + fid,
  };
}
;

export const getUniqueFileName = async (fid: number): Promise<{status: OKNG, data: {fileName: string}}> => {
  const res = await fetch(apiServer + '/file/name/' + fid, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (x) => x.json());
  if (res.status !== 'success') {
    return {
      data: null,
      status: 'NG',
    };
  }
  return {
    status: 'OK',
    data: {
      fileName: res.data.fileName,
    },
  };
}
;

export const getAdminConfig = async (): Promise<{status: OKNG, data: AdminConfigDTO}> => {
  const res = await fetch(apiServer + '/admin', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (x) => x.json());
  if (res.status !== 'success') {
    return {
      data: null,
      status: 'NG',
    };
  }
  return {
    status: 'OK',
    data: res.data,
  };
}
;

export const setAbstractFlag = async (): Promise<{status: OKNG, flag: boolean}> => {
  const res = await fetch(apiServer + '/admin/abstract', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async (x) => x.json());
  return {
    status: res.status,
    flag: res.data,
  };
};

export const setMovieFlag = async (): Promise<{status: OKNG, flag: boolean}> => {
  const res = await fetch(apiServer + '/admin/movie', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async (x) => x.json());
  return {
    status: res.status,
    flag: res.data,
  };
};

export const setPresentationFlag = async (): Promise<{status: OKNG, flag: boolean}> => {
  const res = await fetch(apiServer + '/admin/presentation', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async (x) => x.json());
  return {
    status: res.status,
    flag: res.data,
  };
};

export const setRedirectFlag = async (): Promise<{status: OKNG, flag: boolean}> => {
  const res = await fetch(apiServer + '/admin/redirect', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async (x) => x.json());
  return {
    status: res.status,
    flag: res.data,
  };
};

export const setProgramPageVisible = async () :Promise<{status: OKNG, flag: boolean}> => {
  const res = await fetch(apiServer + '/admin/program-page', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async (x) => x.json());
  return {
    status: res.status,
    flag: res.data,
  };
};

export const adminDeleteUser = async (id: number): Promise<OKNG> => {
  const res = await fetch(apiServer + '/user/' + id, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then(async (x) => x.json());
  return res.status === 'success' ? 'OK' : 'NG';
}
;

export const adminGetHistory = async (): Promise<{status: OKNG, data: HistoryDTO[]}> => {
  const res = await fetch(apiServer + '/history', {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (x) => x.json());
  if (res.status !== 'success') {
    return {
      data: null,
      status: 'NG',
    };
  }
  return {
    status: 'OK',
    data: res.data.map((d: { createdAt: string | number | Date; }) => ({
      ...d,
      createdAt: new Date(d.createdAt),
    })),
  };
}
;

export const adminGetHistoryByUserId = async (id: number): Promise<{status: OKNG, data: HistoryDTO[]}> => {
  const res = await fetch(apiServer + '/history/' + id, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (x) => x.json());
  if (res.status !== 'success') {
    return {
      data: null,
      status: 'NG',
    };
  }
  return {
    status: 'OK',
    data: res.data.map((d: { createdAt: string | number | Date; }) => ({
      ...d,
      createdAt: new Date(d.createdAt),
    })),
  };
}
;
