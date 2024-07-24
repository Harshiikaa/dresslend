import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[@$!%*?&#]/.test(password)) score += 1;
        return score;
    };

    const score = calculatePasswordStrength(password);
    let strength;
    if (score <= 2) {
        strength = 'Weak';
    } else if (score === 3 || score === 4) {
        strength = 'Strong';
    } else {
        strength = 'Very Strong';
    }

    return (
        <div className="mt-2">
            <div
                className={`h-2 rounded ${strength === 'Weak' ? 'bg-red-500' : strength === 'Strong' ? 'bg-yellow-500' : 'bg-green-500'}`}
            ></div>
            <p
                className={`text-sm font-bold mt-1 ${
                    strength === 'Weak'
                        ? 'text-red-500'
                        : strength === 'Strong'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                }`}
            >
                {strength}
            </p>
        </div>
    );
};

export default PasswordStrengthMeter;
