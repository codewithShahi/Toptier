"use server";
import { createSession, getSession, logout } from "@lib/session";
import { baseUrl, token, siteUrl,api_key } from "./actions";
import { decodeBearerToken } from "@src/utils/decodeToken";
import { headers } from "next/headers";


console.log(baseUrl);
// ============== GET DYNAMIC DOMAIN ===============
export async function getDomain(): Promise<string> {
  const h =await  headers();
  const host = h.get("domain") || "booknow.co";

  if (host.includes("localhost")) {
    return "booknow.co"; // default for local dev
  }

  const parts = host.split(".");
  if (parts.length > 2) {
    return parts.slice(-2).join(".");
  }

  console.log("getDomain() =========>>>> fun name domain", host);
  return host;
}
// ============== COMMON HEADER ================
export async function getHeaders(contentType: string = "application/x-www-form-urlencoded") {
  const domain = await getDomain();

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    domain,
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
}

// ---------------- Fetch App Data ---------------- //
export const fetchAppData = async () => {
  try {
    const formData = new FormData();
    formData.append("api_key", api_key ?? "");
    formData.append("language", "en");
    formData.append("currency", "usd");

    const response = await fetch(`${baseUrl}/app`, {
      method: "POST",
      body: formData,
      headers: {
        // Don’t set Content-Type (fetch will do it automatically for FormData)
        "Accept": "application/json, text/plain, */*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Connection": "keep-alive",
      },
    });

    const data = await response.json().catch(() => null);
    // console.log("fetchAppData data", data);

    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

//--------------------------- FETCH COUNTRY LIST ----------------------//

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${baseUrl}/countries`, {
      method: "POST",
      body: JSON.stringify({
        domain: "booknow.co",
      }),
 headers: await getHeaders("application/json"),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
// ---------------------------- FETCH DISTINATION FOR FLIGHT INPUT ------------------------//

export const fetchDestinations = async (city: string) => {
  try {
    const formData = new FormData();
    formData.append("city", city); // <-- Make sure to send the city

    const response = await fetch(`${baseUrl}/flights-cities`, {
      method: "POST",
      body: formData,
     headers: await getHeaders("application/json"),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }
    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};


//---------------------------- SIGN UP --------------------------------------//
export const sign_up = async (signUpData: {
  first_name: string;
  last_name: string;
  email: string;
  country_id: number;
  password: string;
  // terms: boolean;
}) => {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      body: new URLSearchParams({

        first_name: signUpData.first_name,
        last_name: signUpData.last_name,
        email: signUpData.email,
        country_id: signUpData.country_id.toString(),
        password: signUpData.password,
        // terms: signUpData.terms.toString(),
      }).toString(),
             headers: await getHeaders("application/x-www-form-urlencoded"),

    });

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

//---------------------------- LOGIN --------------------------------------//
export const signIn = async (payload: { email: string; password: string }) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      body: new URLSearchParams({
        ...payload,
      }).toString(),
           headers: await getHeaders("application/x-www-form-urlencoded"),

    });

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }
    const user = decodeBearerToken(data.data);
    await createSession(user);
    return { success: "Logged in successfully" };
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
export const signOut = async () => {
  try {
    await logout();
    return { success: "Logged out successfully" };
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};

//------------------------ FORGET PASSWORD -----------------------------//
export const forget_password = async (payload: {
  email: string;

  // terms: boolean;
}) => {
  try {
    const response = await fetch(`${baseUrl}/forget-password`, {
      method: "POST",
      body: new URLSearchParams({


        email: payload.email,

        // terms: signUpData.terms.toString(),
      }).toString(),
            headers: await getHeaders("application/x-www-form-urlencoded"),

    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

// --------------------- ACTIVATE ACCOUNT --------------------------------------//
export const activate_account = async (payload: {
  user_id: string;
  token: string;
}) => {
  try {
    const response = await fetch(`${baseUrl}/account-activate`, {
      method: "POST",
      body: new URLSearchParams({

        ...payload,
      }).toString(),
             headers: await getHeaders("application/x-www-form-urlencoded"),

    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

//---------------------------- UPDATE PROFILE ---------------------------
interface User {
  address1: string;
  country_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_id: string;
}
export const update_profile = async (payload: User) => {
  const formData = new URLSearchParams(
    Object.entries({
      ...payload,
    }).reduce((acc, [key, value]) => {
      acc[key] = String(value); // ✅ convert all values to string
      return acc;
    }, {} as Record<string, string>)
  );

  try {
    const response = await fetch(`${baseUrl}/update-profile`, {
      method: "POST",
      body: formData.toString(),
            headers: await getHeaders("application/x-www-form-urlencoded"),

    });
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }
    const user = decodeBearerToken(data.data);
    await createSession(user);
    return { success: "Logged in successfully" };
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

//====================== CHANGE PASSWORD =========================//

export const change_password = async (payload: {
  user_id: string;
  old_pass: string;
  new_pass: string;
  c_pass: string;
}) => {
  try {
    const response = await fetch(`${baseUrl}/update-password`, {
      method: "POST",
      body: new URLSearchParams({

        ...payload,
      }).toString(),
           headers: await getHeaders("application/x-www-form-urlencoded"),

    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};


