import returnFetch from "return-fetch";

// return-fetch를 사용하여 확장된 fetch 함수
export const fetchExtended = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  interceptors: {
    request: async (args) => {
      args[1] = {
        ...args[1],
        credentials: "include",
      };
      console.log("********* before sending request *********");
      console.log("URL:", args[0].toString());
      console.log("Request Init:", args[1], "\n\n");
      return args;
    },
    response: async (response, requestArgs) => {
      console.log("********* after receiving response *********");
      console.log("URL:", requestArgs[0].toString());
      console.log("Request Init:", requestArgs[1], "\n\n");

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
          return response.json(); // JSON 응답 파싱
        } else if (contentType?.includes("text/plain")) {
          return response.text(); // 텍스트 응답 파싱
        } else {
          return null; // 빈 응답 처리
        }
      } else {
        const errorMessage = `오류가 발생했습니다 (상태 코드: ${response.status})`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
  },
});
