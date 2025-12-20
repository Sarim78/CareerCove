-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  job_type TEXT, -- full-time, part-time, internship, contract
  salary_range TEXT,
  description TEXT,
  requirements TEXT[],
  skills_required TEXT[],
  experience_level TEXT,
  career_field TEXT,
  posted_date TIMESTAMPTZ DEFAULT NOW(),
  application_deadline TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied', -- applied, interviewing, offered, rejected
  cover_letter TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Create user skills table
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  proficiency_level INTEGER CHECK (proficiency_level >= 0 AND proficiency_level <= 100),
  target_level INTEGER CHECK (target_level >= 0 AND target_level <= 100),
  is_required_for_career BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create career paths table
CREATE TABLE IF NOT EXISTS career_paths (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_title TEXT NOT NULL,
  current_role TEXT,
  target_role TEXT,
  timeline_years INTEGER,
  milestones JSONB,
  required_skills TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;

-- Policies for jobs (public read, admin write)
CREATE POLICY "Anyone can view active jobs" ON jobs FOR SELECT USING (is_active = true);

-- Policies for job_applications
CREATE POLICY "Users can view own applications" ON job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON job_applications FOR UPDATE USING (auth.uid() = user_id);

-- Policies for saved_jobs
CREATE POLICY "Users can view own saved jobs" ON saved_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved jobs" ON saved_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved jobs" ON saved_jobs FOR DELETE USING (auth.uid() = user_id);

-- Policies for messages
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own received messages" ON messages FOR UPDATE USING (auth.uid() = receiver_id);

-- Policies for user_skills
CREATE POLICY "Users can view own skills" ON user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skills" ON user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON user_skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own skills" ON user_skills FOR DELETE USING (auth.uid() = user_id);

-- Policies for career_paths
CREATE POLICY "Users can view own career paths" ON career_paths FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own career paths" ON career_paths FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own career paths" ON career_paths FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own career paths" ON career_paths FOR DELETE USING (auth.uid() = user_id);
