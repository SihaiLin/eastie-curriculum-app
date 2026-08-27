import { useMemo, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type LoginMode = "password" | "code" | "create-password";

export function LoginPage() {
  const {
    isAuthLoading,
    isAuthenticated,
    login,
    requestLoginCode,
    setPassword,
    verifyLoginCode,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [devCode, setDevCode] = useState("");
  const [hasRequestedCode, setHasRequestedCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const requested = params.get("redirect");
    return requested?.startsWith("/") ? requested : "/curriculum";
  }, [location.search]);

  if (!isAuthLoading && isAuthenticated && mode !== "create-password") {
    return <Navigate replace to={redirectTo} />;
  }

  async function handlePasswordLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email: normalizedEmail, password });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Password login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRequestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      setError("Enter your EASTIE email.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await requestLoginCode(normalizedEmail);
      setEmail(normalizedEmail);
      setHasRequestedCode(true);
      setStatus(result.message);
      setDevCode(result.devLoginCode ?? "");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not send login code.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!normalizeEmail(email) || !/^\d{6}$/.test(code.trim())) {
      setError("Enter the 6-digit code from your email.");
      return;
    }

    try {
      setIsSubmitting(true);
      await verifyLoginCode({ code, email });
      setMode("create-password");
      setPasswordValue("");
      setConfirmPassword("");
      setStatus("Email verified. Please create your password for future logins.");
      setDevCode("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login code verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCreatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    if (!password.trim()) {
      setError("Enter a password to save.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirmation do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await setPassword({ newPassword: password });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not save password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function switchMode(nextMode: LoginMode) {
    resetMessages();
    setMode(nextMode);
    if (nextMode === "code") {
      setPasswordValue("");
      setConfirmPassword("");
    }
  }

  function resetMessages() {
    setError("");
    setStatus("");
    setDevCode("");
  }

  return (
    <main className="login-page">
      <section className="login-hero" aria-label="EASTIE login">
        <div className="login-brand">
          <img className="login-crest" src="/assets/eastie_crest.jpg" alt="EASTIE crest" />
          <div>
            <p>EASTIE Curriculum</p>
            <h1>Teacher Portal</h1>
          </div>
        </div>
        <p className="login-copy">
          Sign in with your EASTIE teacher email and personal password. First-time teachers can verify by email code
          once, then create a password for future logins. The email code is not your password.
        </p>
        <div className="login-art" aria-hidden="true">
          <img src="/assets/eastie_dolphins.png" alt="" />
        </div>
      </section>

      <section className="login-card">
        <p className="login-kicker">EASTIE App Login</p>
        <h2>{mode === "create-password" ? "Create your password" : "Sign in to continue"}</h2>

        {mode === "password" ? (
          <form className="login-form" onSubmit={handlePasswordLogin}>
            <label>
              <span>Email</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="teacher@eastie.com.cn"
                type="email"
                value={email}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                autoComplete="current-password"
                name="password"
                onChange={(event) => setPasswordValue(event.target.value)}
                type="password"
                value={password}
              />
            </label>
            <button className="login-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
            <button className="forgot-password-link" onClick={() => switchMode("code")} type="button">
              First time here? Verify by email code and create a password
            </button>
          </form>
        ) : null}

        {mode === "code" && !hasRequestedCode ? (
          <form className="login-form" onSubmit={handleRequestCode}>
            <label>
              <span>Email</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="teacher@eastie.com.cn"
                type="email"
                value={email}
              />
            </label>
            <button className="login-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Sending..." : "Send Login Code"}
            </button>
            <button className="forgot-password-link" onClick={() => switchMode("password")} type="button">
              I already have a password
            </button>
          </form>
        ) : null}

        {mode === "code" && hasRequestedCode ? (
          <form className="login-form" onSubmit={handleVerifyCode}>
            <label>
              <span>Email</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                value={email}
              />
            </label>
            <label>
              <span>6-digit code</span>
              <input
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={6}
                name="code"
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                type="text"
                value={code}
              />
            </label>
            <button className="login-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Checking..." : "Verify Email"}
            </button>
            <button
              className="forgot-password-link"
              disabled={isSubmitting}
              onClick={async () => {
                try {
                  resetMessages();
                  setIsSubmitting(true);
                  const result = await requestLoginCode(email);
                  setStatus(result.message);
                  setDevCode(result.devLoginCode ?? "");
                } catch (error) {
                  setError(error instanceof Error ? error.message : "Could not resend login code.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              type="button"
            >
              Resend code
            </button>
          </form>
        ) : null}

        {mode === "create-password" ? (
          <form className="login-form" onSubmit={handleCreatePassword}>
            <p className="login-note">
              Your email is verified. Choose any password you can remember. No uppercase, number, or symbol rule is required.
            </p>
            <label>
              <span>New password</span>
              <input
                autoComplete="new-password"
                autoFocus
                name="new-password"
                onChange={(event) => setPasswordValue(event.target.value)}
                type="password"
                value={password}
              />
            </label>
            <label>
              <span>Confirm password</span>
              <input
                autoComplete="new-password"
                name="confirm-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                value={confirmPassword}
              />
            </label>
            <button className="login-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Saving..." : "Save Password and Continue"}
            </button>
          </form>
        ) : null}

        {status ? <p className="auth-status">{status}</p> : null}
        {devCode ? (
          <p className="auth-status">
            Local dev code: <strong>{devCode}</strong>
          </p>
        ) : null}
        {error ? <p className="login-error">{error}</p> : null}

        <p className="login-note">
          Use Logout on shared school computers when you finish. Sessions can stay signed in for up to seven days.
        </p>
      </section>
    </main>
  );
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}
