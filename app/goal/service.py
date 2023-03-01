from ..repository import Repository
from ..repository.mongo import MongoRepository
from .schema import KudoSchema

class Service(object):
  def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository)):
    self.repo_client = repo_client
    self.user_id = user_id

    if not user_id:
      raise Exception("user id not provided")

  def find_all_kudos(self):
    kudos  = self.repo_client.find_all({'user_id': self.user_id})
    return [self.dump(kudo) for kudo in kudos]

  def create_kudo_for(self, goalData):
    self.repo_client.create(self.prepare_kudo(goalData))
    return self.dump(goalData.data)

  def delete_kudo_for(self):
    records_affected = self.repo_client.delete({'user_id': self.user_id})
    return records_affected > 0

  def dump(self, data):
    return KudoSchema(exclude=['_id']).dump(data).data

