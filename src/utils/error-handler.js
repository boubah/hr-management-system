export class ApiError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    // La requête a été faite et le serveur a répondu avec un code d'état
    const { status, data } = error.response;
    throw new ApiError(
      data.message || 'Une erreur est survenue',
      status,
      data.errors
    );
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    throw new ApiError(
      'Impossible de contacter le serveur',
      0
    );
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    throw new ApiError(
      error.message || 'Une erreur est survenue',
      0
    );
  }
};
