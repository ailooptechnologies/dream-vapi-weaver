
import React, { useState, useEffect, useRef } from 'react';
import { Input } from './input';
import { Button } from './button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Input as SearchInput } from './input';
import { ChevronDown, X } from 'lucide-react';
import { ScrollArea } from './scroll-area';
import { cn } from '@/lib/utils';

// List of country codes
const countryCodes = [
  { name: 'United States', code: 'US', dial: '+1' },
  { name: 'Canada', code: 'CA', dial: '+1' },
  { name: 'India', code: 'IN', dial: '+91' },
  { name: 'United Kingdom', code: 'GB', dial: '+44' },
  { name: 'Australia', code: 'AU', dial: '+61' },
  { name: 'Germany', code: 'DE', dial: '+49' },
  { name: 'France', code: 'FR', dial: '+33' },
  { name: 'China', code: 'CN', dial: '+86' },
  { name: 'Japan', code: 'JP', dial: '+81' },
  { name: 'Brazil', code: 'BR', dial: '+55' },
  { name: 'Russia', code: 'RU', dial: '+7' },
  { name: 'Mexico', code: 'MX', dial: '+52' },
  { name: 'South Korea', code: 'KR', dial: '+82' },
  { name: 'Spain', code: 'ES', dial: '+34' },
  { name: 'Italy', code: 'IT', dial: '+39' },
  { name: 'Netherlands', code: 'NL', dial: '+31' },
  { name: 'Switzerland', code: 'CH', dial: '+41' },
  { name: 'Singapore', code: 'SG', dial: '+65' },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971' },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966' },
  // Add more countries as needed
];

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value = '', onChange, className, inputClassName, disabled, ...props }, ref) => {
    const [countryCode, setCountryCode] = useState('+1'); // Default to US (+1)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Split the initial value into country code and phone number
    useEffect(() => {
      if (value) {
        const codeMatch = value.match(/^\+\d+/);
        if (codeMatch) {
          const code = codeMatch[0];
          setCountryCode(code);
          setPhoneNumber(value.substring(code.length).trim());
        } else {
          // If no country code is found, add the default +1 (US)
          setPhoneNumber(value);
          onChange(`+1 ${value}`);
        }
      } else {
        setPhoneNumber('');
      }
    }, [value]);

    // Filter countries based on search query
    const filteredCountries = countryCodes.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dial.includes(searchQuery)
    );

    // Update the combined value when either part changes
    const updateCombinedValue = (code: string, number: string) => {
      onChange(`${code} ${number}`.trim());
    };

    // Handle country code change
    const handleCountryCodeChange = (code: string) => {
      setCountryCode(code);
      updateCombinedValue(code, phoneNumber);
    };

    // Handle phone number change
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const number = e.target.value;
      setPhoneNumber(number);
      updateCombinedValue(countryCode, number);
    };

    // Clear search query when dropdown closes
    const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        setSearchQuery('');
      }
    };

    return (
      <div className={cn("flex items-stretch w-full", className)}>
        <Select 
          onValueChange={handleCountryCodeChange}
          defaultValue="+1"
          value={countryCode}
          onOpenChange={handleOpenChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-24 md:w-28 rounded-r-none border-r-0 focus:ring-offset-0">
            <SelectValue placeholder={countryCode} />
          </SelectTrigger>
          <SelectContent className="w-[280px] max-h-[300px]" position="popper">
            <div className="p-2 sticky top-0 bg-popover z-10">
              <SearchInput
                placeholder="Search country or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8"
              />
              {searchQuery && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-3 h-6 w-6"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <ScrollArea className="h-[240px]">
              {filteredCountries.map((country) => (
                <SelectItem key={country.code} value={country.dial}>
                  <div className="flex justify-between">
                    <span>{country.name}</span>
                    <span className="text-muted-foreground">{country.dial}</span>
                  </div>
                </SelectItem>
              ))}
              {filteredCountries.length === 0 && (
                <div className="py-2 px-2 text-center text-muted-foreground">
                  No countries found
                </div>
              )}
            </ScrollArea>
          </SelectContent>
        </Select>
        <Input
          ref={inputRef}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className={cn("rounded-l-none flex-1", inputClassName)}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
