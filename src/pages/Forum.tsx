import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Post = {
  id: number;
  author: string;
  authorRole: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  pinned?: boolean;
  locked?: boolean;
  timestamp: string;
};

type Report = {
  id: number;
  reporter: string;
  targetUser: string;
  reason: string;
  postId: number;
  status: 'pending' | 'reviewed' | 'resolved';
  timestamp: string;
};

const Forum = () => {
  const { toast } = useToast();
  const [currentUser] = useState({ username: 'TOURIST-WAGNERA', role: 'Основатель сервера', isAdmin: true });
  const [activeTab, setActiveTab] = useState('posts');
  
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: 'TOURIST-WAGNERA', authorRole: 'Глава', title: 'Добро пожаловать на форум!', content: 'Приветствуем всех участников сервера. Соблюдайте правила и наслаждайтесь общением!', likes: 24, replies: 8, pinned: true, timestamp: '2 часа назад' },
    { id: 2, author: 'Pancake', authorRole: 'Старший админ', title: 'Обновление правил сервера', content: 'Внимание! Обновлены правила сервера. Ознакомьтесь с изменениями.', likes: 15, replies: 5, timestamp: '5 часов назад' },
  ]);

  const [news, setNews] = useState<Post[]>([
    { id: 1, author: 'TOURIST-WAGNERA', authorRole: 'Глава', title: 'Открыт набор в МВД', content: 'Начался набор новых сотрудников в МВД. Подавайте заявки!', likes: 42, replies: 12, timestamp: '1 день назад' },
  ]);

  const [reports, setReports] = useState<Report[]>([
    { id: 1, reporter: 'Player123', targetUser: 'Spammer', reason: 'Нарушение правил форума, спам', postId: 5, status: 'pending', timestamp: '30 минут назад' },
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    const post: Post = {
      id: posts.length + 1,
      author: currentUser.username,
      authorRole: currentUser.role,
      title: newPostTitle,
      content: newPostContent,
      likes: 0,
      replies: 0,
      timestamp: 'только что'
    };

    setPosts([post, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    toast({ title: 'Успех', description: 'Пост создан!' });
  };

  const handleCreateNews = () => {
    if (!currentUser.isAdmin) return;
    if (!newNewsTitle || !newNewsContent) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    const newsPost: Post = {
      id: news.length + 1,
      author: currentUser.username,
      authorRole: currentUser.role,
      title: newNewsTitle,
      content: newNewsContent,
      likes: 0,
      replies: 0,
      timestamp: 'только что'
    };

    setNews([newsPost, ...news]);
    setNewNewsTitle('');
    setNewNewsContent('');
    toast({ title: 'Успех', description: 'Новость опубликована!' });
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
    toast({ title: 'Пост удален', description: 'Пост успешно удален' });
  };

  const handleLockPost = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, locked: !p.locked } : p));
    toast({ title: 'Готово', description: 'Статус поста изменен' });
  };

  const handleResolveReport = (id: number) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    toast({ title: 'Жалоба обработана', description: 'Статус жалобы изменен на "решено"' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F3B] to-[#1A1F2C]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.1),transparent_50%)]" />
      
      <div className="relative">
        <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="MessageSquare" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Форум сервера
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
              {currentUser.isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" className="gap-2 border-red-500/50 hover:bg-red-500/10">
                    <Icon name="Settings" size={18} />
                    Админ-панель
                  </Button>
                </Link>
              )}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold">{currentUser.username}</div>
                  <div className="text-xs text-red-500">{currentUser.role}</div>
                </div>
                <Avatar className="border-2 border-primary">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                    {currentUser.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10">
              <TabsTrigger value="posts">Обсуждения</TabsTrigger>
              <TabsTrigger value="news">Новости</TabsTrigger>
              <TabsTrigger value="reports">
                Жалобы
                {reports.filter(r => r.status === 'pending').length > 0 && (
                  <Badge className="ml-2 bg-red-500">{reports.filter(r => r.status === 'pending').length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="create">Создать пост</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Обсуждения</CardTitle>
                  <CardDescription>Общение участников сервера</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {posts.map((post) => (
                    <Card key={post.id} className={`border-white/10 ${post.pinned ? 'border-primary/50 bg-primary/5' : 'bg-white/5'}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="border-2 border-primary/50">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                                {post.author.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{post.author}</span>
                                <Badge className="bg-primary/20 text-primary text-xs">{post.authorRole}</Badge>
                                {post.pinned && <Icon name="Pin" size={16} className="text-primary" />}
                                {post.locked && <Icon name="Lock" size={16} className="text-red-500" />}
                              </div>
                              <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                            </div>
                          </div>
                          {currentUser.isAdmin && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" onClick={() => handleLockPost(post.id)}>
                                <Icon name={post.locked ? 'Unlock' : 'Lock'} size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDeletePost(post.id)}>
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-xl mt-3">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="ThumbsUp" size={16} />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="MessageCircle" size={16} />
                            {post.replies}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Новости сервера</CardTitle>
                      <CardDescription>Официальные объявления администрации</CardDescription>
                    </div>
                    {currentUser.isAdmin && (
                      <Button onClick={() => setActiveTab('create-news')} className="gap-2">
                        <Icon name="Plus" size={18} />
                        Создать новость
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {news.map((post) => (
                    <Card key={post.id} className="border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="border-2 border-primary/50">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                                {post.author.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{post.author}</span>
                                <Badge className="bg-red-500/20 text-red-400 text-xs">{post.authorRole}</Badge>
                                <Icon name="Megaphone" size={16} className="text-primary" />
                              </div>
                              <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl mt-3">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="ThumbsUp" size={16} />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="MessageCircle" size={16} />
                            {post.replies}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              {currentUser.isAdmin ? (
                <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Жалобы пользователей</CardTitle>
                    <CardDescription>Модерация форума</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reports.map((report) => (
                      <Card key={report.id} className={`border-white/10 ${report.status === 'pending' ? 'border-yellow-500/50 bg-yellow-500/5' : 'bg-white/5'}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={report.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}>
                                  {report.status === 'pending' ? 'На рассмотрении' : 'Решено'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{report.timestamp}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Отправитель:</span> <span className="font-semibold">{report.reporter}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Нарушитель:</span> <span className="font-semibold text-red-400">{report.targetUser}</span>
                              </div>
                              <div className="text-sm mt-2">
                                <span className="text-muted-foreground">Причина:</span> {report.reason}
                              </div>
                            </div>
                            {report.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="gap-2" onClick={() => handleResolveReport(report.id)}>
                                  <Icon name="Check" size={16} />
                                  Решить
                                </Button>
                                <Link to={`/admin?ban=${report.targetUser}`}>
                                  <Button size="sm" variant="destructive" className="gap-2">
                                    <Icon name="Ban" size={16} />
                                    Забанить
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="py-12 text-center">
                    <Icon name="ShieldAlert" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">Доступ ограничен</h3>
                    <p className="text-muted-foreground">Только администраторы могут просматривать жалобы</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Создать новый пост</CardTitle>
                  <CardDescription>Поделитесь своими мыслями с сообществом</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Заголовок</Label>
                    <Input 
                      id="title" 
                      placeholder="Введите заголовок поста" 
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Содержание</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Напишите текст поста..." 
                      rows={6}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <Button onClick={handleCreatePost} className="w-full gap-2">
                    <Icon name="Send" size={18} />
                    Опубликовать пост
                  </Button>
                </CardContent>
              </Card>

              {currentUser.isAdmin && (
                <Card className="border-primary/50 bg-primary/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Megaphone" size={24} className="text-primary" />
                      Создать новость (только для администрации)
                    </CardTitle>
                    <CardDescription>Официальное объявление от лица администрации</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="news-title">Заголовок новости</Label>
                      <Input 
                        id="news-title" 
                        placeholder="Введите заголовок новости" 
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="news-content">Содержание новости</Label>
                      <Textarea 
                        id="news-content" 
                        placeholder="Напишите текст новости..." 
                        rows={6}
                        value={newNewsContent}
                        onChange={(e) => setNewNewsContent(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <Button onClick={handleCreateNews} className="w-full gap-2 bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Megaphone" size={18} />
                      Опубликовать новость
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Forum;
