-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  personality_type TEXT,
  interests JSONB,
  skills JSONB,
  career_matches JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_careers table
CREATE TABLE IF NOT EXISTS public.saved_careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_title TEXT NOT NULL,
  career_data JSONB,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentor_bookings table
CREATE TABLE IF NOT EXISTS public.mentor_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_name TEXT NOT NULL,
  session_date TIMESTAMP WITH TIME ZONE,
  session_type TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Quiz results policies
CREATE POLICY "Users can view own quiz results" ON public.quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON public.quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz results" ON public.quiz_results
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own quiz results" ON public.quiz_results
  FOR DELETE USING (auth.uid() = user_id);

-- Saved careers policies
CREATE POLICY "Users can view own saved careers" ON public.saved_careers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved careers" ON public.saved_careers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved careers" ON public.saved_careers
  FOR DELETE USING (auth.uid() = user_id);

-- Mentor bookings policies
CREATE POLICY "Users can view own bookings" ON public.mentor_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" ON public.mentor_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON public.mentor_bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings" ON public.mentor_bookings
  FOR DELETE USING (auth.uid() = user_id);
