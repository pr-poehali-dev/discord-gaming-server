import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: number;
  username: string;
  role: string;
  status: 'active' | 'muted' | 'banned';
  joinDate: string;
};

type AdminUser = {
  name: string;
  role: string;
  status: string;
  statusColor: string;
};

type CustomRole = {
  id: number;
  name: string;
  color: string;
  permissions: string[];
};

const Admin = () => {
  const { toast } = useToast();
  const [currentUser] = useState({ username: 'TOURIST-WAGNERA', role: 'Основатель сервера' });

  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'Pancake', role: 'Старший админ', status: 'active', joinDate: '15.12.2025' },
    { id: 2, username: 'cj', role: 'Младший админ', status: 'active', joinDate: '20.12.2025' },
    { id: 3, username: 'Player123', role: 'Игрок', status: 'active', joinDate: '01.01.2026' },
    { id: 4, username: 'Spammer', role: 'Игрок', status: 'muted', joinDate: '05.01.2026' },
  ]);

  const [admins, setAdmins] = useState<AdminUser[]>([
    { name: 'TOURIST-WAGNERA', role: 'Основатель сервера', status: 'Глава', statusColor: 'text-red-500' },
    { name: 'Pancake', role: 'Старший администратор', status: 'Старший админ', statusColor: 'text-orange-500' },
    { name: 'cj', role: 'Младший администратор', status: 'Младший админ', statusColor: 'text-yellow-500' },
  ]);

  const [customRoles, setCustomRoles] = useState<CustomRole[]>([
    { id: 1, name: 'VIP Игрок', color: 'gold', permissions: ['chat', 'forum'] },
    { id: 2, name: 'Модератор', color: 'blue', permissions: ['chat', 'forum', 'mute', 'kick'] },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('');
  const [newAdminStatus, setNewAdminStatus] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('');

  const handleBanUser = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' } : u));
    const user = users.find(u => u.id === userId);
    toast({ 
      title: user?.status === 'banned' ? 'Разбан' : 'Бан', 
      description: `Пользователь ${user?.username} ${user?.status === 'banned' ? 'разбанен' : 'забанен'}` 
    });
  };

  const handleMuteUser = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'muted' ? 'active' : 'muted' } : u));
    const user = users.find(u => u.id === userId);
    toast({ 
      title: user?.status === 'muted' ? 'Размут' : 'Мут', 
      description: `Пользователь ${user?.username} ${user?.status === 'muted' ? 'размучен' : 'замучен'}` 
    });
  };

  const handleChangeUserRole = (userId: number, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    const user = users.find(u => u.id === userId);
    toast({ title: 'Роль изменена', description: `${user?.username} теперь ${newRole}` });
  };

  const handleAddAdmin = () => {
    if (!newAdminName || !newAdminRole || !newAdminStatus) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    const newAdmin: AdminUser = {
      name: newAdminName,
      role: newAdminRole,
      status: newAdminStatus,
      statusColor: 'text-green-500'
    };

    setAdmins([...admins, newAdmin]);
    setNewAdminName('');
    setNewAdminRole('');
    setNewAdminStatus('');
    toast({ title: 'Успех', description: 'Администратор добавлен!' });
  };

  const handleRemoveAdmin = (name: string) => {
    if (name === 'TOURIST-WAGNERA') {
      toast({ title: 'Ошибка', description: 'Нельзя удалить основателя', variant: 'destructive' });
      return;
    }
    setAdmins(admins.filter(a => a.name !== name));
    toast({ title: 'Удалено', description: `${name} удален из администрации` });
  };

  const handleCreateRole = () => {
    if (!newRoleName || !newRoleColor) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    const role: CustomRole = {
      id: customRoles.length + 1,
      name: newRoleName,
      color: newRoleColor,
      permissions: ['chat', 'forum']
    };

    setCustomRoles([...customRoles, role]);
    setNewRoleName('');
    setNewRoleColor('');
    toast({ title: 'Успех', description: 'Роль создана!' });
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F3B] to-[#1A1F2C]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.1),transparent_50%)]" />
      
      <div className="relative">
        <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  Админ-панель
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <Icon name="Home" size={18} />
                  На главную
                </Button>
              </Link>
              <Link to="/forum">
                <Button variant="outline" className="gap-2">
                  <Icon name="MessageSquare" size={18} />
                  Форум
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold">{currentUser.username}</div>
                  <div className="text-xs text-red-500">{currentUser.role}</div>
                </div>
                <Avatar className="border-2 border-red-500">
                  <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-700 text-white font-bold">
                    {currentUser.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10">
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="admins">Администрация</TabsTrigger>
              <TabsTrigger value="roles">Роли</TabsTrigger>
              <TabsTrigger value="leaderboard">Рейтинг</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Управление пользователями</CardTitle>
                  <CardDescription>Бан, мут, изменение ролей</CardDescription>
                  <Input 
                    placeholder="Поиск пользователя..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border-white/10 mt-4"
                  />
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className={`border-white/10 ${
                      user.status === 'banned' ? 'border-red-500/50 bg-red-500/5' :
                      user.status === 'muted' ? 'border-yellow-500/50 bg-yellow-500/5' :
                      'bg-white/5'
                    }`}>
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12 border-2 border-primary/50">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                                {user.username.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{user.username}</span>
                                <Badge className={
                                  user.status === 'banned' ? 'bg-red-500/20 text-red-400' :
                                  user.status === 'muted' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }>
                                  {user.status === 'banned' ? 'Забанен' : user.status === 'muted' ? 'Замучен' : 'Активен'}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {user.role} • Присоединился {user.joinDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select onValueChange={(value) => handleChangeUserRole(user.id, value)}>
                              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                                <SelectValue placeholder="Изменить роль" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Игрок">Игрок</SelectItem>
                                <SelectItem value="VIP Игрок">VIP Игрок</SelectItem>
                                <SelectItem value="Модератор">Модератор</SelectItem>
                                <SelectItem value="Младший админ">Младший админ</SelectItem>
                                <SelectItem value="Старший админ">Старший админ</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleMuteUser(user.id)}
                              className={user.status === 'muted' ? 'border-yellow-500/50' : ''}
                            >
                              <Icon name={user.status === 'muted' ? 'Volume2' : 'VolumeX'} size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleBanUser(user.id)}
                            >
                              <Icon name={user.status === 'banned' ? 'UserCheck' : 'Ban'} size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admins" className="space-y-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Управление администрацией</CardTitle>
                  <CardDescription>Добавление и удаление администраторов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg">Добавить администратора</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>Имя пользователя</Label>
                        <Input 
                          placeholder="Введите имя"
                          value={newAdminName}
                          onChange={(e) => setNewAdminName(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div>
                        <Label>Должность</Label>
                        <Input 
                          placeholder="Например: Модератор"
                          value={newAdminRole}
                          onChange={(e) => setNewAdminRole(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div>
                        <Label>Статус</Label>
                        <Input 
                          placeholder="Например: Старший модератор"
                          value={newAdminStatus}
                          onChange={(e) => setNewAdminStatus(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <Button onClick={handleAddAdmin} className="w-full gap-2">
                        <Icon name="UserPlus" size={18} />
                        Добавить в команду
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {admins.map((admin, idx) => (
                      <Card key={idx} className="border-white/10 bg-white/5">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12 border-2 border-primary/50">
                                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                                  {admin.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-bold">{admin.name}</div>
                                <div className={`text-sm font-semibold ${admin.statusColor}`}>{admin.status}</div>
                                <div className="text-xs text-muted-foreground">{admin.role}</div>
                              </div>
                            </div>
                            {admin.name !== 'TOURIST-WAGNERA' && (
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRemoveAdmin(admin.name)}
                              >
                                <Icon name="UserMinus" size={16} />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Управление ролями</CardTitle>
                  <CardDescription>Создание и настройка пользовательских ролей</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg">Создать новую роль</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>Название роли</Label>
                        <Input 
                          placeholder="Например: Премиум игрок"
                          value={newRoleName}
                          onChange={(e) => setNewRoleName(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div>
                        <Label>Цвет роли</Label>
                        <Select onValueChange={setNewRoleColor}>
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Выберите цвет" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="red">Красный</SelectItem>
                            <SelectItem value="orange">Оранжевый</SelectItem>
                            <SelectItem value="yellow">Желтый</SelectItem>
                            <SelectItem value="green">Зеленый</SelectItem>
                            <SelectItem value="blue">Синий</SelectItem>
                            <SelectItem value="purple">Фиолетовый</SelectItem>
                            <SelectItem value="gold">Золотой</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleCreateRole} className="w-full gap-2">
                        <Icon name="Plus" size={18} />
                        Создать роль
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {customRoles.map((role) => (
                      <Card key={role.id} className="border-white/10 bg-white/5">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full bg-${role.color}-500`} />
                                <span className="font-bold">{role.name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Права: {role.permissions.join(', ')}
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Icon name="Settings" size={16} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Управление рейтингом</CardTitle>
                  <CardDescription>Добавление и изменение топа игроков</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Icon name="Trophy" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">Рейтинговая система</h3>
                    <p className="text-muted-foreground mb-4">
                      Здесь вы можете управлять рейтингом игроков, добавлять очки и изменять позиции
                    </p>
                    <Button className="gap-2">
                      <Icon name="Plus" size={18} />
                      Добавить игрока в рейтинг
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Admin;
