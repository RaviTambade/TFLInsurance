using TFLInsurance.LicInsurance.Repositories.Interfaces;
using LicInsurance.Api.Models;
using LicInsurance.Api.Data.Constant;
using LicInsurance.Api.Repositories.Dapper;

namespace TFLInsurance.LicInsurance.Repositories;

    public class AgentsRepository : IAgentsRepository
    {
        private readonly IDapperfactory _dapper;

        public AgentsRepository(IDapperfactory dapper)
        {
            _dapper = dapper;
        }

        public List<Agents> GetAll()
        {
            return _dapper.Query<Agents>(
                AgentsStoredProcedure.Agent_GET_ALL)
                .ToList();
        }

        public Agents? GetById(int id)
        {
            return _dapper.QueryFirstOrDefault<Agents>(
                AgentsStoredProcedure.Agent_GET_BY_ID,
                new
                {
                    AgentId = id
                });
        }

        public int Save(Agents agents)
        {
            return _dapper.Execute(
                AgentsStoredProcedure.Agent_SAVE,
                new
                {
                    agents.AgentId,
                    agents.AgentCode,
                    agents.FullName,
                    
                });
        }

        public int Delete(int id)
        {
            return _dapper.Execute(
                AgentsStoredProcedure.Agent_DELETE,
                new
                {
                    AgentId = id
                });
        }
    }