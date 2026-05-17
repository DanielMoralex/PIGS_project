import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const NATIONALITIES = [
  'Afghan', 'Albanian', 'Algerian', 'Argentinian', 'Australian', 'Austrian',
  'Belgian', 'Bolivian', 'Brazilian', 'British', 'Bulgarian', 'Canadian',
  'Chilean', 'Chinese', 'Colombian', 'Croatian', 'Czech', 'Danish', 'Dutch',
  'Ecuadorian', 'Egyptian', 'Finnish', 'French', 'German', 'Greek',
  'Guatemalan', 'Hungarian', 'Indian', 'Indonesian', 'Iranian', 'Iraqi',
  'Irish', 'Israeli', 'Italian', 'Japanese', 'Jordanian', 'Kenyan',
  'Korean', 'Lebanese', 'Malaysian', 'Mexican', 'Moroccan', 'New Zealander',
  'Nigerian', 'Norwegian', 'Pakistani', 'Paraguayan', 'Peruvian', 'Philippine',
  'Polish', 'Portuguese', 'Romanian', 'Russian', 'Saudi', 'Serbian',
  'Singaporean', 'South African', 'Spanish', 'Swedish', 'Swiss', 'Syrian',
  'Taiwanese', 'Thai', 'Tunisian', 'Turkish', 'Ukrainian', 'Uruguayan',
  'Venezuelan', 'Vietnamese', 'Other',
];

interface Props { onClose: () => void; }

const AuthModal = ({ onClose }: Props) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register extra fields
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const resetFields = () => {
    setUsername(''); setPassword(''); setEmail('');
    setAge(''); setNationality(''); setConfirmPassword('');
    setError('');
  };

  const handleSubmit = () => {
    setError('');

    if (!username || !password) return setError('fill in all fields!');

    if (mode === 'login') {
      const ok = login(username, password);
      if (!ok) setError('wrong username or password!');
      else onClose();
      return;
    }

    // Register validations
    if (!email || !age || !nationality || !confirmPassword)
      return setError('fill in all fields!');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError('invalid email address!');
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 5 || ageNum > 120)
      return setError('enter a valid age (5–120)!');
    if (password !== confirmPassword)
      return setError('passwords do not match!');
    if (password.length < 6)
      return setError('password must be at least 6 characters!');

    const ok = register(username, password, email, ageNum, nationality);
    if (!ok) setError('username already taken!');
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bevel-box p-6 w-full max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-pixel text-[10px] text-y2k-yellow">
            {mode === 'login' ? '🔑 LOGIN' : '📝 REGISTER'}
          </h2>
          <button onClick={onClose} className="font-pixel text-[10px] text-y2k-pink hover:text-y2k-yellow">✕</button>
        </div>

        <div className="space-y-3">
          {/* Common fields */}
          <input
            type="text"
            placeholder="username..."
            value={username}
            onChange={e => { setUsername(e.target.value); setError(''); }}
            className="w-full bevel-box-inset px-3 py-2 font-retro text-y2k-cyan bg-background focus:outline-none"
          />
          <input
            type="password"
            placeholder="password..."
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            className="w-full bevel-box-inset px-3 py-2 font-retro text-y2k-cyan bg-background focus:outline-none"
          />

          {/* Register-only fields */}
          {mode === 'register' && (
            <>
              <input
                type="password"
                placeholder="confirm password..."
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                className="w-full bevel-box-inset px-3 py-2 font-retro text-y2k-cyan bg-background focus:outline-none"
              />
              <input
                type="email"
                placeholder="email..."
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                className="w-full bevel-box-inset px-3 py-2 font-retro text-y2k-cyan bg-background focus:outline-none"
              />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="age..."
                value={age}
                onChange={e => { setAge(e.target.value); setError(''); }}
                className="w-full bevel-box-inset px-3 py-2 font-retro text-y2k-cyan bg-background focus:outline-none"
              />
              <select
                value={nationality}
                onChange={e => { setNationality(e.target.value); setError(''); }}
                className="w-full bevel-box-inset px-3 py-2 font-retro text-y2k-cyan bg-background focus:outline-none cursor-pointer"
              >
                <option value="">select nationality...</option>
                {NATIONALITIES.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </>
          )}

          {error && <p className="font-pixel text-[8px] text-y2k-pink">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bevel-box py-2 font-pixel text-[9px] text-y2k-lime hover:text-y2k-yellow transition-colors"
          >
            {mode === 'login' ? '→ ENTER' : '→ CREATE ACCOUNT'}
          </button>

          <p className="font-retro text-center text-muted-foreground">
            {mode === 'login' ? "no account? " : "already registered? "}
            <button
              onClick={() => { resetFields(); setMode(mode === 'login' ? 'register' : 'login'); }}
              className="text-y2k-cyan hover:text-y2k-yellow"
            >
              {mode === 'login' ? 'register here!' : 'login!'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;