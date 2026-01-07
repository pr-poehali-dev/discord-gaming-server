import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const mockServerInfo = {
  name: 'LEGENDS ARENA',
  status: 'online',
  online: 847,
  total: 1200,
  description: 'Легендарный игровой сервер для настоящих профессионалов. Турниры, рейтинги, призы.',
  version: 'v2.4.1'
};

const mockLeaderboard = [
  { rank: 1, username: 'ShadowKing', avatar: '', score: 15240, badge: '👑' },
  { rank: 2, username: 'NeonStrike', avatar: '', score: 14890, badge: '⚡' },
  { rank: 3, username: 'DarkPhoenix', avatar: '', score: 13765, badge: '🔥' },
  { rank: 4, username: 'CyberNinja', avatar: '', score: 12340, badge: '⚔️' },
  { rank: 5, username: 'QuantumRush', avatar: '', score: 11980, badge: '💫' },
];

const mockAdmins = [
  { name: 'Alex "Storm" Ivanov', role: 'Главный администратор', avatar: '', status: 'online', color: 'from-purple-500 to-pink-500' },
  { name: 'Maria "Blade" Volkov', role: 'Модератор', avatar: '', status: 'online', color: 'from-blue-500 to-cyan-500' },
  { name: 'Ivan "Tech" Petrov', role: 'Технический директор', avatar: '', status: 'away', color: 'from-green-500 to-emerald-500' },
  { name: 'Sofia "Angel" Kim', role: 'Модератор', avatar: '', status: 'offline', color: 'from-orange-500 to-red-500' },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({ username: 'Guest_Player', avatar: '' });

  const handleDiscordLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F3B] to-[#1A1F2C]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.1),transparent_50%)]" />
      
      <div className="relative">
        <header className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GAME SERVER
              </h1>
            </div>

            {!isLoggedIn ? (
              <Button onClick={handleDiscordLogin} className="bg-[#5865F2] hover:bg-[#4752C4] gap-2">
                <Icon name="MessageCircle" size={18} />
                Войти через Discord
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{user.username}</span>
                <Avatar className="border-2 border-primary">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="Users" size={24} className="text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{mockServerInfo.online}</div>
                      <div className="text-sm text-muted-foreground">Онлайн</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="UserCheck" size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{mockServerInfo.total}</div>
                      <div className="text-sm text-muted-foreground">Всего игроков</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Zap" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{mockServerInfo.version}</div>
                      <div className="text-sm text-muted-foreground">Версия</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Icon name="Trophy" size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Рейтинг игроков</CardTitle>
                  <CardDescription>Топ-5 лучших участников сервера</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLeaderboard.map((player) => (
                <div
                  key={player.rank}
                  className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-all hover:border-primary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl ${
                      player.rank === 1 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                      player.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                      player.rank === 3 ? 'bg-gradient-to-br from-orange-700 to-orange-800' :
                      'bg-white/10'
                    }`}>
                      #{player.rank}
                    </div>

                    <Avatar className="w-12 h-12 border-2 border-primary/50">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                        {player.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{player.username}</span>
                        <span className="text-xl">{player.badge}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {player.score.toLocaleString()} очков
                      </div>
                    </div>

                    <Badge className="bg-primary/20 text-primary border-primary/30 text-lg px-3 py-1">
                      {player.score.toLocaleString()}
                    </Badge>
                  </div>
                </div>
              ))}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAdmins.map((admin, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/10 transition-all hover:border-primary/50 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${admin.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    
                    <div className="relative flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 border-2 border-primary/50">
                          <AvatarImage src={admin.avatar} />
                          <AvatarFallback className={`bg-gradient-to-br ${admin.color} text-white font-bold text-xl`}>
                            {admin.name.split(' ')[0].substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${
                          admin.status === 'online' ? 'bg-green-500' :
                          admin.status === 'away' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`} />
                      </div>

                      <div className="flex-1">
                        <div className="font-bold text-lg">{admin.name}</div>
                        <div className="text-sm text-muted-foreground">{admin.role}</div>
                      </div>

                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
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
                © 2026 Game Server. Все права защищены.
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="MessageCircle" size={16} />
                  Discord
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="FileText" size={16} />
                  Правила
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="HelpCircle" size={16} />
                  Поддержка
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
