import { logoutRequest } from "./logout";
import { apiClient } from "shared/api";

jest.mock("shared/api", () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

describe("logoutRequest", () => {
  it("Отправляет запрос с данными и возвращает response.data", async () => {
    const mockResponse = "string";

    (apiClient.post as jest.Mock).mockResolvedValue({
      data: mockResponse,
    });

    const result = await logoutRequest();

    expect(apiClient.post).toHaveBeenCalledWith("/auth/logout");
    expect(result).toBe(mockResponse);
  });
});
