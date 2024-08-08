import returnFetch from "return-fetch";

// return-fetch를 사용하여 확장된 fetch 함수
export const fetchExtended = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
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

      // 200-299 상태 코드 또는 201 Created 상태 코드 처리
      if (response.ok || response.status === 201) {
        // 응답 본문이 있는지 확인
        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
          try {
            return await response.json(); // JSON 응답인 경우
          } catch (error) {
            console.error("JSON 파싱 오류:", error);
            throw new Error("응답 데이터를 JSON으로 파싱할 수 없습니다");
          }
        } else if (contentType?.includes("text/plain")) {
          try {
            return await response.text(); // 텍스트 응답인 경우
          } catch (error) {
            console.error("텍스트 파싱 오류:", error);
            throw new Error("응답 데이터를 텍스트로 파싱할 수 없습니다");
          }
        } else {
          // 응답 본문이 없는 경우에도 성공으로 간주
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
