import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const mockServerInfo = {
  name: 'Brick Rigs - Russian Town',
  status: 'online',
  description: 'Лучший сервер brick rigs только тут!',
  version: 'v2.4.1'
};

const openFactions = [
  { name: 'МВД', icon: 'Shield', color: 'from-blue-600 to-blue-700' },
  { name: 'ДПС', icon: 'Car', color: 'from-yellow-600 to-yellow-700' },
  { name: 'СОБР МВД', icon: 'Skull', color: 'from-red-600 to-red-700' },
  { name: 'Росгвардия', icon: 'ShieldCheck', color: 'from-green-600 to-green-700' },
];

const closedFactions = [
  { name: 'ФСБ', icon: 'Lock', color: 'from-purple-600 to-purple-700' },
  { name: 'ФСО', icon: 'Lock', color: 'from-indigo-600 to-indigo-700' },
];

const admins = [
  { name: 'TOURIST-WAGNERA', role: 'Основатель сервера', status: 'Глава', statusColor: 'text-red-500' },
  { name: 'Pancake', role: 'Старший администратор', status: 'Старший админ', statusColor: 'text-orange-500' },
  { name: 'cj', role: 'Младший администратор', status: 'Младший админ', statusColor: 'text-yellow-500' },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', role: '' });

  const handleLogin = (username: string, role: string) => {
    setUser({ username, role });
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F3B] to-[#1A1F2C]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.1),transparent_50%)]" />
      
      <div className="relative">
        <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {mockServerInfo.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                      Войти
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-primary to-secondary">
                      Регистрация
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  {user.username === 'TOURIST-WAGNERA' && (
                    <Link to="/admin">
                      <Button variant="outline" className="gap-2 border-red-500/50 hover:bg-red-500/10">
                        <Icon name="Settings" size={18} />
                        Админ-панель
                      </Button>
                    </Link>
                  )}
                  <Link to="/forum">
                    <Button variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
                      <Icon name="MessageSquare" size={18} />
                      Форум
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold">{user.username}</div>
                      <div className={`text-xs ${user.username === 'TOURIST-WAGNERA' ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {user.role}
                      </div>
                    </div>
                    <Avatar className="border-2 border-primary">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50" />
            <CardHeader className="relative">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-4xl font-bold">{mockServerInfo.name}</CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                      {mockServerInfo.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-base text-muted-foreground">
                    {mockServerInfo.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div className="flex gap-4">
                <a href="https://discord.gg/RuBxnxyEV5" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] gap-2 text-lg px-6 py-6">
                    <Icon name="MessageCircle" size={20} />
                    Вступить в Discord сервер
                  </Button>
                </a>
                <Link to="/forum">
                  <Button variant="outline" className="border-primary/50 hover:bg-primary/10 gap-2 text-lg px-6 py-6">
                    <Icon name="MessageSquare" size={20} />
                    Перейти на форум
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Открытые фракции</CardTitle>
                  <CardDescription>Доступны для всех игроков</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {openFactions.map((faction, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/10 transition-all hover:border-primary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${faction.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={faction.icon as any} size={28} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold">{faction.name}</div>
                        <div className="text-sm text-green-400">Открыта для набора</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Icon name="Lock" size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Закрытые фракции</CardTitle>
                  <CardDescription>Требуют специального допуска</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {closedFactions.map((faction, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-red-500/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${faction.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={faction.icon as any} size={28} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold">{faction.name}</div>
                        <div className="text-sm text-red-400">Закрыта</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-span-full bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Icon name="Info" size={20} />
                    <span className="text-sm">Некоторые фракции все еще закрыты</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Администрация</CardTitle>
                  <CardDescription>Команда управления сервером</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {admins.map((admin, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/10 transition-all hover:border-primary/50 overflow-hidden"
                  >
                    <div className="relative flex flex-col items-center text-center gap-3">
                      <div className="relative">
                        <Avatar className="w-20 h-20 border-2 border-primary/50">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-2xl">
                            {admin.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background" />
                      </div>

                      <div className="w-full">
                        <div className="font-bold text-lg">{admin.name}</div>
                        <div className={`text-sm font-semibold ${admin.statusColor}`}>{admin.status}</div>
                        <div className="text-xs text-muted-foreground mt-1">{admin.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        <footer className="border-t border-white/10 backdrop-blur-xl bg-white/5 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                {mockServerInfo.name} © 2026
              </div>
              <div className="flex items-center gap-4">
                <a href="https://discord.gg/RuBxnxyEV5" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Icon name="MessageCircle" size={16} />
                    Discord
                  </Button>
                </a>
                <Link to="/forum">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Icon name="MessageSquare" size={16} />
                    Форум
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </footer>

        {!isLoggedIn && (
          <div className="fixed bottom-4 right-4 z-50">
            <Card className="border-primary/50 bg-white/10 backdrop-blur-xl max-w-sm">
              <CardHeader>
                <CardTitle className="text-lg">Демо-вход</CardTitle>
                <CardDescription>Для тестирования системы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => handleLogin('TOURIST-WAGNERA', 'Глава')}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700"
                >
                  Войти как Основатель
                </Button>
                <Button 
                  onClick={() => handleLogin('TestPlayer', 'Игрок')}
                  variant="outline"
                  className="w-full"
                >
                  Войти как Игрок
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
