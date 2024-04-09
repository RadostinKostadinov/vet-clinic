export default async function fetchVetClinicAPI(url, options = {}) {
  options = {
    ...options,
    credentials: "include",
  };

  let res = null;
  try {
    res = await fetch(url, options);

    // console.log("fetchVetClinicAPI-beforeRefreshToken", res);
    // If the request was unauthorized due to an expired token
    if (res.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry the request with the new token
        res = await fetch(url, options);
      } else {
        window.location = "/login";
      }
    }

    // console.log("fetchVetClinicAPI-afterRefreshToken", res);
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] fetchVetClinicAPI: ${error.message}`
    );
    window.location = "/";
  }
}

async function refreshAccessToken() {
  // Implement the logic to refresh the access token using the refresh token
  // This might involve calling another API endpoint and updating the stored access token
  // Return true if the token was successfully refreshed, false otherwise
  const res = await fetch("http://localhost:5000/auth/refreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // console.log("refreshAccessToken", res);
  if (res.status === 200) {
    return true;
  }

  return false;
}
