
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

interface CountryCode {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", dial_code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", dial_code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", dial_code: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dial_code: "+33", flag: "🇫🇷" },
  { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
  { name: "Japan", code: "JP", dial_code: "+81", flag: "🇯🇵" },
  { name: "China", code: "CN", dial_code: "+86", flag: "🇨🇳" },
  { name: "Brazil", code: "BR", dial_code: "+55", flag: "🇧🇷" },
  { name: "Russia", code: "RU", dial_code: "+7", flag: "🇷🇺" },
  { name: "Spain", code: "ES", dial_code: "+34", flag: "🇪🇸" },
  { name: "Italy", code: "IT", dial_code: "+39", flag: "🇮🇹" },
  { name: "Mexico", code: "MX", dial_code: "+52", flag: "🇲🇽" },
];

export function PhoneInput({ value, onChange, className }: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Extract country code and phone number from initial value
  useEffect(() => {
    if (value) {
      // Try to find the country code from the phone number
      const country = countryCodes.find(c => value.startsWith(c.dial_code));
      
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.substring(country.dial_code.length).trim());
      } else {
        // If no country code is found, just set the entire value as phone number
        setPhoneNumber(value);
      }
    }
  }, []);

  // Update the combined value when either country code or phone number changes
  useEffect(() => {
    const combinedValue = `${selectedCountry.dial_code} ${phoneNumber}`;
    onChange(combinedValue.trim());
  }, [selectedCountry, phoneNumber, onChange]);

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setOpen(false);
    
    // Focus the input after selecting a country
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className={cn("flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[120px] justify-between"
          >
            <span className="flex items-center gap-2 truncate">
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.dial_code}</span>
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryCodes.map((country) => (
                  <CommandItem
                    key={country.code}
                    onSelect={() => handleCountrySelect(country)}
                    className="flex items-center gap-2"
                  >
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                    <span className="ml-auto text-muted-foreground">{country.dial_code}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        ref={inputRef}
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="flex-1 rounded-l-none"
        placeholder="Phone number"
      />
    </div>
  );
}
