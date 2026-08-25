import { useState, type FormEvent } from "react";
import { useAuth } from "./AuthProvider";

export function ChangePasswordDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { changePassword, currentUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    if (newPassword !== confirmPassword) {
      setStatus("New password and confirmation do not match.");
      return;
    }

    let result: { ok: boolean; message: string };
    try {
      result = await changePassword({ currentPassword, newPassword });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Password change failed.");
      return;
    }

    setStatus(result.message);

    if (result.ok) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="auth-dialog-backdrop" role="presentation">
      <section aria-modal="true" className="auth-dialog" role="dialog">
        <div className="auth-dialog-header">
          <div>
            <p>Account Security</p>
            <h2>Change Password</h2>
          </div>
          <button aria-label="Close change password dialog" className="dialog-close-button" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <p className="auth-dialog-copy">
          Signed in as <strong>{currentUser?.email}</strong>. Password changes are handled by the EASTIE API.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Current password</span>
            <input
              autoComplete="current-password"
              onChange={(event) => setCurrentPassword(event.target.value)}
              type="password"
              value={currentPassword}
            />
          </label>
          <label>
            <span>New password</span>
            <input
              autoComplete="new-password"
              onChange={(event) => setNewPassword(event.target.value)}
              type="password"
              value={newPassword}
            />
          </label>
          <label>
            <span>Confirm new password</span>
            <input
              autoComplete="new-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              value={confirmPassword}
            />
          </label>
          <div className="dialog-actions">
            <button className="secondary-auth-button" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="login-submit" type="submit">
              Save Password
            </button>
          </div>
          {status ? <p className="auth-status">{status}</p> : null}
        </form>
      </section>
    </div>
  );
}
