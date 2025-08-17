'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { updateAccount } from '@/app/(login)/actions';
import { User } from '@/lib/db/schema';
import useSWR from 'swr';
import { Suspense, useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function AccountForm({ user }: { user?: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await updateAccount(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-4" action={handleSubmit}>
      <div>
        <Label htmlFor="name" className="mb-2">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          defaultValue={user?.name || ''}
          required
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={user?.email || ''}
          required
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm">{success}</p>
      )}
      <Button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Account'
        )}
      </Button>
    </form>
  );
}

function AccountFormWithData() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  return <AccountForm user={user} />;
}

export default function GeneralPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        General Settings
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <AccountFormWithData />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}
