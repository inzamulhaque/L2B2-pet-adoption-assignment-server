export interface IPet {
  name: string;
  photo: string;
  briefDescription: string;
  age: number;
  breed: string;
  location: string;
  healthStatus: PetHealthStatus;
  status: PetStatus;
}

export enum PetHealthStatus {
  VACCINATED = "VACCINATED",
  NEUTERED = "NEUTERED",
  NOT_AVAILABLE = "NOT_AVAILABLE",
}

export enum PetStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  DELETED = "DELETED",
  REQUESTED = "REQUESTED",
  ADOPTED = "ADOPTED",
}
