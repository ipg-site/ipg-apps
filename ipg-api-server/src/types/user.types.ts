export type Grade = 'B3' | 'B4' | 'M1' | 'M2' | 'D1' | 'D2' | 'D3' | 'その他';

export type Presentation = 'オーラル' | 'ポスター1' | 'ポスター2' | '聴講';

export type UserDTO = {
  id?: number;
  fullName: string;
  email: string;
  password?: string;
  university: string;
  grade: Grade;
  presentationType: Presentation;
  address: string;
  title: string;
  isAdmin?: boolean;
  presentationId?: string;
};

export type PresentationDTO = {
  fullName: string;
  university: string;
  title: string;
  presentationId: string;
  fileId: number;
};
