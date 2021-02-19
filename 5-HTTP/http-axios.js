const setHeaders = (xhr, headers) => {
  Object.entries(headers).forEach((entry) => {
    const [name, value] = entry;

    xhr.setRequestHeader(name, value);
  });
};

const parseResponse = (xhr) => {
  const { status, responseText } = xhr;

  let data;

  //   HTTP Status 204 (No Content) indicates that the server has
  //   successfully fulfilled the request and that there is no content
  //    to send in the response payload body. ... For example,
  //    you may want to return status 204 (No Content) in UPDATE
  //     operations where request payload is large enough not to
  //     transport back and forth.
  console.log("xhr", xhr);
  if (status !== 204) {
    data = JSON.parse(responseText);
  }

  return { status, data };
};
const request = (params) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const { method = "GET", url, headers = {}, body = {} } = params;

    xhr.open(method, url);

    setHeaders(xhr, headers);

    xhr.send(JSON.stringify(body));

    xhr.onerror = () => {
      reject(new Error("HTTP Error"));
    };

    xhr.ontimeout = () => {
      reject(new Error("Timeout Error"));
    };

    xhr.onload = () => resolve(parseResponse(xhr));
  });
};

const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "GET",
  });

  return response.data;
};

const post = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "POST",
    body,
  });

  return response.data;
};

const put = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PUT",
    body,
  });

  return response.data;
};

const patch = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PATCH",
    body,
  });

  return response.data;
};

const deleteRequest = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "DELETE",
  });

  return response.data;
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
